import { useState } from 'react';
import { usePrivacyStore } from '../../store/usePrivacyStore';

export default function PrivacyCenter() {
  const { consent, updateConsent, isPrivacyCenterOpen, closePrivacyCenter, deleteAccount } = usePrivacyStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  if (!isPrivacyCenterOpen || !consent) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteAccount();
    setIsDeleting(false);
    setDeleteConfirm(false);
    alert('Account data deletion requested and local storage cleared.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-white/10 bg-carbon p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-xl font-bold text-white">Privacy Center (CCPA & GDPR)</h2>
          <button onClick={closePrivacyCenter} className="text-white/60 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {/* CCPA: Do Not Sell or Share */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Do Not Sell or Share My Personal Information</h3>
              <p className="text-sm text-white/60">Opt-out of data sharing for behavioral advertising.</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={consent.doNotSellShare}
                onChange={(e) => updateConsent({ doNotSellShare: e.target.checked })}
              />
              <div className="peer h-6 w-11 rounded-full bg-white/20 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-accent peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
            </label>
          </div>

          {/* GDPR/CCPA: AI Training & ADMT */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">AI Training & Automated Decisions (ADMT)</h3>
              <p className="text-sm text-white/60">Allow your data to be used to train our AI models.</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={consent.aiTraining}
                onChange={(e) => {
                  updateConsent({ aiTraining: e.target.checked, admt: e.target.checked });
                }}
              />
              <div className="peer h-6 w-11 rounded-full bg-white/20 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-accent peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
            </label>
          </div>

          <hr className="border-white/10" />

          {/* DROP Requirement: Data Deletion */}
          <div>
            <h3 className="font-medium text-red-400">Request Data Deletion</h3>
            <p className="mb-3 text-sm text-white/60">Permanently delete your account and all associated data.</p>
            
            {!deleteConfirm ? (
              <button 
                onClick={() => setDeleteConfirm(true)}
                className="rounded-md border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
              >
                Delete My Data
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Confirm Deletion'}
                </button>
                <button 
                  onClick={() => setDeleteConfirm(false)}
                  className="rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
