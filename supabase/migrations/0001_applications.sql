-- =============================================================================
-- Migración: tabla de solicitudes del formulario público "Aplicar"
-- Modelo Zero Trust: denegado por defecto, INSERT ciego para 'anon', validación
-- en la capa de datos (Check Constraints) y lectura reservada a 'service_role'.
-- =============================================================================

-- gen_random_uuid()
create extension if not exists pgcrypto;

-- -----------------------------------------------------------------------------
-- 1. Tabla + validación en disco (defensa en profundidad: la BD no confía en
--    el cliente; valida longitud y formato antes de escribir).
-- -----------------------------------------------------------------------------
create table if not exists public.applications (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null    default now(),
  name        text        not null,
  email       text        not null,
  company     text,
  challenge   text        not null,
  locale      text        not null    default 'es',

  constraint applications_name_len      check (char_length(name) between 1 and 120),
  constraint applications_email_len     check (char_length(email) <= 160),
  constraint applications_email_format  check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  constraint applications_company_len   check (company is null or char_length(company) <= 160),
  constraint applications_challenge_len check (char_length(challenge) between 1 and 5000),
  constraint applications_locale_chk    check (locale in ('es', 'en'))
);

comment on table public.applications is
  'Solicitudes del formulario público. anon: solo INSERT ciego. Lectura: solo service_role.';

-- Índice para el panel administrativo (consultado vía service_role).
create index if not exists applications_created_at_idx
  on public.applications (created_at desc);

-- -----------------------------------------------------------------------------
-- 2. Row Level Security: ACTIVAR y FORZAR (sin política => acceso denegado).
-- -----------------------------------------------------------------------------
alter table public.applications enable row level security;
alter table public.applications force  row level security;

-- -----------------------------------------------------------------------------
-- 3. Menor privilegio a nivel de privilegios SQL: partir de cero.
--    Se revoca todo y se concede EXCLUSIVAMENTE INSERT, y solo sobre las
--    columnas que el visitante puede aportar. 'id', 'created_at' los fija el
--    servidor: anon no puede sobrescribirlos.
-- -----------------------------------------------------------------------------
revoke all on public.applications from anon, authenticated, public;

grant insert (name, email, company, challenge, locale)
  on public.applications to anon;

-- -----------------------------------------------------------------------------
-- 4. Política RLS: BLIND INSERT.
--    anon SOLO puede INSERT. No existe política de SELECT/UPDATE/DELETE para
--    anon => esas operaciones quedan denegadas por defecto. Un atacante con la
--    anon key (que es pública) NO puede leer ni alterar registros de nadie.
-- -----------------------------------------------------------------------------
drop policy if exists "anon_blind_insert" on public.applications;
create policy "anon_blind_insert"
  on public.applications
  as permissive
  for insert
  to anon
  with check (true);

-- (Intencionalmente NO se crea ninguna policy for select / update / delete.)

-- -----------------------------------------------------------------------------
-- 5. Lectura administrativa: solo 'service_role' (tiene BYPASSRLS por diseño y
--    debe usarse EXCLUSIVAMENTE en el servidor, nunca en el cliente).
--    No se concede ningún privilegio de lectura a anon/authenticated.
-- -----------------------------------------------------------------------------
-- Cliente (supabase-js v2) — INSERT ciego, sin .select():
--   await supabase.from('applications').insert({ name, email, company, challenge, locale });
-- Al no encadenar .select(), PostgREST usa Prefer: return=minimal: no requiere
-- privilegio SELECT y no devuelve datos de la fila.
