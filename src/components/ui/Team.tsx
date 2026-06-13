import { useTranslation } from 'react-i18next';
import SectionHeading from './SectionHeading';
import LinkedInIcon from './LinkedInIcon';
import TeamCard from './TeamCard';
import { COMPANY_LINKEDIN, TEAM } from '../../data/company';
import { useReveal } from '../../hooks/useReveal';

export default function Team() {
  const { t } = useTranslation('about');
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);

  return (
    <section id="equipo" className="relative scroll-mt-16 bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title={t('team.title')} subtitle={t('team.subtitle')} />

        <div ref={ref} className="grid gap-8 md:grid-cols-3">
          {TEAM.map((member, index) => (
            <TeamCard
              key={member.name}
              member={member}
              visible={visible}
              delay={index * 120}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={COMPANY_LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-carbon-soft/80 transition-colors hover:text-accent"
          >
            <LinkedInIcon className="h-5 w-5" />
            {t('team.companyLinkedin')}
          </a>
        </div>
      </div>
    </section>
  );
}
