import { CubeContext, QueryBuilder } from '@cubejs-client/react';
import { renderDashlet } from '@uidu/dashlets';
import FieldDownshift, { DownshiftVerticalCard } from '@uidu/field-downshift';
import Form, { FormSubmit, useForm } from '@uidu/form';
import React, { useContext, useState } from 'react';
import { DashletsFormProps } from '../types';
import {
  chartTypeToDashletKinds,
  measuresToSeriesForChartType,
  stateChangeHeuristics,
} from '../utils';
import Legend from './Legend';
import MemberGroup from './QueryBuilder/MemberGroup';
import TimeGroup from './QueryBuilder/TimeGroup';

export default function DashletsForm({
  vizState,
  setVizState,
  chartExtra,
  handleSubmit,
}: DashletsFormProps) {
  const { cubejsApi } = useContext(CubeContext);

  const form = useForm({ mode: 'all' });

  const [config, setConfig] = useState({});
  const [query, setQuery] = useState({});
  const [kind, setKind] = useState('XY');

  return (
    <QueryBuilder
      query={query}
      setQuery={setQuery}
      // vizState={vizState}
      // setVizState={setVizState}
      stateChangeHeuristics={stateChangeHeuristics}
      cubejsApi={cubejsApi}
      wrapWithQueryRenderer={false}
      render={({
        availableDimensions,
        availableMeasures,
        availableSegments,
        availableTimeDimensions,
        dimensions,
        isQueryPresent,
        measures,
        segments,
        timeDimensions,
        updateDimensions,
        updateMeasures,
        updateQuery,
        updateSegments,
        updateTimeDimensions,
        chartType,
        meta,
        ...rest
      }) => {
        return (
          <Form
            form={form}
            handleSubmit={async (model) =>
              handleSubmit({
                kind,
                query,
                config,
              })
            }
            footerRenderer={({ canSubmit, loading }) => (
              <div className="p-3 border-top d-flex justify-content-end">
                <FormSubmit
                  canSubmit={canSubmit}
                  loading={loading}
                  label="Confirm"
                />
              </div>
            )}
          >
            <div className="py-3 container-fluid border-bottom">
              <div className="row">
                <div className="col-sm-3">
                  <MemberGroup
                    title="Measures"
                    name="measures"
                    members={measures}
                    availableMembers={availableMeasures}
                    addMemberName="Measure"
                    updateMethods={updateMeasures}
                    updateQuery={updateQuery}
                  />
                </div>
                <div className="col-sm-3">
                  <MemberGroup
                    title="Dimensions"
                    name="dimensions"
                    members={dimensions}
                    availableMembers={availableDimensions}
                    addMemberName="Dimension"
                    updateMethods={updateDimensions}
                    updateQuery={updateQuery}
                  />
                </div>
                <div className="col-sm-5">
                  <TimeGroup
                    title="Time"
                    members={timeDimensions}
                    availableMembers={availableTimeDimensions}
                    updateMethods={updateTimeDimensions}
                  />
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="py-3 col-lg-8" style={{ height: 400 }}>
                  {isQueryPresent ? (
                    renderDashlet({
                      label: 'Default label',
                      kind,
                      query,
                      config: {
                        ...config,
                        series: measuresToSeriesForChartType(
                          measures,
                          chartType,
                        ),
                      },
                    })
                  ) : (
                    <div>Empty state</div>
                  )}
                </div>
                <div className="py-3 col-lg-4 border-left">
                  {!!isQueryPresent && (
                    <>
                      <FieldDownshift
                        label="Chart kind"
                        name="kind"
                        scope="primary"
                        menu={(props) => <div className="d-flex" {...props} />}
                        option={DownshiftVerticalCard}
                        options={chartTypeToDashletKinds(chartType).map(
                          (k) => ({ id: k, name: k }),
                        )}
                        onChange={(name, value) => setKind(value)}
                      />
                      <hr style={{ borderTopWidth: 2 }} />
                      {/* <Series
                          measures={measures}
                          config={config}
                          setConfig={setConfig}
                        />
                        <hr style={{ borderTopWidth: 2 }} /> */}
                      <Legend config={config} setConfig={setConfig} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    />
  );
}
