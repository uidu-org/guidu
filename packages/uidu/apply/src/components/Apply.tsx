import { Shell, ShellStep } from '@uidu/widgets';
// import AnimatedCheck from 'components/AnimatedCheck';
// import ContactForm from 'organization/components/contacts/form';
import React from 'react';
import Application from './steps/Application';
import Preferences from './steps/Preferences';

export default function Apply({
  createApplication,
  updateApplication,
  currentContact,
  application,
  call,
  embedded,
}) {
  const steps: ShellStep[] = [
    {
      relativePath: 'reminder',
      name: 'Destina il tuo 5x1000',
      component: () => (
        <Application
          call={call}
          application={application}
          onSave={(newDonation) => {
            this.setState(
              {
                ...newDonation,
              },
              () => setTimeout(() => this.slider.current.slideNext(), 500),
            );
          }}
        />
      ),
    },
    {
      relativePath: 'preferences',
      name: 'Personalizza',
      component: () => (
        <div>
          <div className="p-3 p-xl-4 bg-tax-returns">
            <div className="media align-items-center">
              {/* <AnimatedCheck
                  className="mr-3 text-white"
                  style={{ width: '28px' }}
                /> */}
              <div className="media-body">
                <p className="mb-0 text-white text-medium">
                  Donazione effettuata con successo
                </p>
              </div>
            </div>
          </div>
          <div className="p-3 p-xl-4">
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a className="card mb-3" href={application.receiptPath}>
              <div className="media align-items-stretch">
                <div className="d-flex align-items-center py-2 px-3 bg-light">
                  <div
                    className="file-icon file-icon-xs d-flex mx-1 flex-shrink-0"
                    data-type="pdf"
                    style={{
                      width: '11px',
                      height: '16px',
                      verticalAlign: 'sub',
                    }}
                  />
                </div>
                <div className="media-body text-medium py-2 px-3">
                  Scarica la ricevuta
                </div>
              </div>
            </a>
            <a className="card" href={application.receiptPath}>
              <div className="media align-items-stretch">
                <div className="d-flex align-items-center py-2 px-3 bg-light">
                  <div
                    className="file-icon file-icon-xs d-flex mx-1 flex-shrink-0"
                    data-type="pdf"
                    style={{
                      width: '11px',
                      height: '16px',
                      verticalAlign: 'sub',
                    }}
                  />
                </div>
                <div className="media-body text-medium py-2 px-3">
                  Condividi sui social
                </div>
              </div>
            </a>
          </div>
          <hr />

          <div className="p-3 p-xl-4">
            {application.subscription ? (
              <p>Registrati</p>
            ) : (
              <Preferences
                call={call}
                // submitted={loadingSection !== 'contact'}
                application={application}
                onSave={(newContact) => {
                  this.setState({
                    contact: newContact,
                  });
                }}
              />
            )}
          </div>
        </div>
      ),
    },
  ];

  return <Shell name={call.name} steps={steps} embedded={embedded} />;
}
