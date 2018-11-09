import React, { Component } from 'react';
import JoyrideWrapper from 'components/JoyrideWrapper';

export default class ProfileUserTour extends Component {

  constructor(props) {
    super(props);
    this.tourCallback = this.tourCallback.bind(this);
  }

  tourCallback(params) {
    if (params.action === 'beacon:click') {
      switch (params.index) {
        case 1:
          // this.props.router.push(this.props.projects[0].hashtag)
          break;
        case 2:
          // this.props.router.push('/')
          break;
        case 3:
          // $('.dashboard-app-contacts').css({ backgroundColor: '#f1f3f5' })
          break;
        default:
          break;
      }
    } else if (params.type === 'step:after') {
      switch (params.index) {
        case 2:
          // this.props.router.push('/')
          break;
        case 3:
          // $('.navbar-actors').dropdown('toggle')
          break;
        default:
          break;
      }
    } else if (params.type === 'error:target_not_found') {
      setTimeout(function() {
        // _self.joyride.start()
      }, 500);
    } else if (params.type === 'finished') {
      // $('.dashboard-app-contacts').css({ backgroundColor: 'inherit' })
      this.props.onTourFinished && this.props.onTourFinished();
    }
  }

  render() {
    return (
      <JoyrideWrapper
        scrollContainer={document.querySelectorAll('[canvas="container"]')[0]}
        ref={(c) => this.joyride = c}
        shouldRedraw={this.props.shouldRedraw}
        // showStepsProgress={true}
        // type="continuous"
        steps={[
          {
            text: <div>
              <p className="lead">
                Ciao {Uidu.current_user.first_name}, ora che sei parte di questa meravigliosa community è tempo di completare il tuo profilo!
              </p>
              <p className="lead">
                Il tuo profilo è <b>un vero e proprio curriculum</b> che racconta come le tue esperienze di volontariato e di lavoro possono essere utili alle organizzazioni vicine a te e ai tuoi interessi. Completando il profilo sarà molto <b>più facile trovare l'occasione giusta</b>, oppure crearla.
              </p>
              <p><b>Inizia...mettendoci la faccia!</b></p>
            </div>,
            textAlign: 'center',
            selector: '.tour-0',
            position: 'top',
            allowClicksThruHole: true,
          },
          {
            text: <div>
              <p className="lead">
                Per modificare il tuo profilo ti basta cliccare sui campi da modificare, niente di più facile. Prova ad insere la tua descrizione
              </p>
            </div>,
            selector: '.tour-1',
            position: 'bottom',
            allowClicksThruHole: false,
          },
          {
            text: <div>
              <p className="lead">
                Puoi aggiungere le tue esperienze formative e le tue competenze, scegli tu <b>il modo migliore di presentarti</b>. Puoi anche farlo raccontando le tue storie, che <b>siano di ispirazione</b> per quelli come te e come noi, che vogliono cambiare le cose, cominciando da quello che ci circonda.
              </p>
            </div>,
            selector: '.tour-2',
            position: 'top',
            allowClicksThruHole: true,
          },
          {
            text: <div>
              <p className="lead">
                Nella tua scrivania puoi trovare gli aggiornamenti della community, con le storie e le collezioni migliori o che decidi di seguire.
              </p>
            </div>,
            selector: '.joyride-dashboard-url',
            position: 'bottom',
            allowClicksThruHole: false,
          },
          {
            text: <div>
              <p className="lead">
                Su uidu trovi migliaia di organizzazioni, cittadini e professionisti: trova quelli che sono più vicini a te e ai tuoi interessi!
              </p>
            </div>,
            selector: '.joyride-discover-url',
            position: 'bottom',
            allowClicksThruHole: true,
          },
          // {
          //   text: <div>
          //     <p className="lead">Ora hai a disposizione un intero set di strumenti utili per il tuo lavoro. Ci sono un sacco di funzionalità che potrai scoprire piano piano.</p>
          //     <p className="lead"><b>Per ora ti consigliamo di partire dall'Anagrafica!</b></p>
          //   </div>,
          //   selector: '.dashboard-apps',
          //   position: 'left',
          //   allowClicksThruHole: true
          // }
        ]}
        run={this.props.shouldTourStart}
        debug={false}
        callback={this.tourCallback}
      />
    );
  }
}

ProfileUserTour.defaultProps = {
  shouldRedraw: true,
};
