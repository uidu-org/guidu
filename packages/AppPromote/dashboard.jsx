import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  Legend,
  ReferenceLine,
} from 'recharts';

import NavbarAppActions from 'components/NavbarAppActions';

const data = [
  { name: 'Page A', uv: -4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: -3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: -2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: -2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: -1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: -2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: -3490, pv: 4300, amt: 2100 },
];

export default function PromoteDashboard() {
  return (
    <div>
      <NavbarAppActions
        brand={<a className="navbar-brand mr-auto">Riepilogo</a>}
      >
        <Link exact to="/promote/emails/new" className="btn btn-sm">
          <i className="icon-plus mr-2" /> Nuova campagna email
        </Link>
        <Link exact to="/promote/sms/new" className="btn btn-sm">
          <i className="icon-plus mr-2" /> Nuova campagna SMS
        </Link>
      </NavbarAppActions>
      <div className="container-fluid py-4">
        <div className="row equal">
          <div className="col-sm-4">
            <div className="panel panel-default">
              <div className="panel-body panel-compressed">
                <div className="media">
                  <div className="media-left media-middle">
                    <div className="media-icon-avatar">
                      <i className="icon-people text-events" />
                    </div>
                  </div>
                  <div className="media-body media-middle">
                    <h5>
                      {window.I18n.t(
                        'apps.calls.views.sections.dashboard.proposals',
                      )}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel panel-default">
              <div className="panel-body panel-compressed">
                <div className="media">
                  <div className="media-left media-middle">
                    <div className="media-icon-avatar">
                      <i className="icon-clock text-events" />
                    </div>
                  </div>
                  <div className="media-body media-middle">
                    <h5>Tesserati</h5>
                    <p>10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel panel-default">
              <div className="panel-body panel-compressed">
                <div className="media">
                  <div className="media-left media-middle">
                    <div className="media-icon-avatar">
                      <i className="icon-power text-events" />
                    </div>
                  </div>
                  <div className="media-body media-middle">
                    <h5>Valore medio annuo</h5>
                    <p>35 €</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: '100%', height: '256px' }}>
        <ResponsiveContainer>
          <BarChart
            stackOffset="sign"
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
