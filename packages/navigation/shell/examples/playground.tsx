import React, { useState } from 'react';
import {
  ScrollableContainer,
  ShellBody,
  ShellFooter,
  ShellHeader,
  ShellMain,
  ShellSidebar,
} from '../src';

const Wrapper = ({
  borderColor,
  children,
  noOutline,
  noHorizontalScrollbar,
}: {
  borderColor: string;
  children: React.ReactNode;
  noOutline?: boolean;
  noHorizontalScrollbar?: boolean;
}) => (
  <div
    style={{
      outline: noOutline ? 'none' : `2px dashed ${borderColor}`,
      outlineOffset: -4,
      padding: 8,
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      overflowY: 'auto',
      overflowX: noHorizontalScrollbar ? 'hidden' : 'auto',
      backgroundColor: 'white',
    }}
  >
    {children}
  </div>
);

const scrollableContentCSS = {
  height: '2rem',
  width: '80%',
  backgroundColor: 'papayawhip',
  margin: '2rem auto',
  boxSizing: 'border-box',
  borderRadius: 3,
};

const ScrollableContent = () => {
  const arr = new Array(50);
  return <>{arr.fill(<div style={scrollableContentCSS} />)}</>;
};

const ToggleScrollableContent = ({ onChange, value }) => (
  <>
    <label style={{ display: 'block', whiteSpace: 'nowrap' }}>
      <input
        type="checkbox"
        onChange={onChange}
        value={value.toString()}
        checked={value}
      />
      Toggle scrollable content
    </label>
    {value && <ScrollableContent />}
  </>
);

const ToggleShown = ({ onChange, value, name, id }) => (
  <label style={{ display: 'block' }}>
    <input
      type="checkbox"
      onChange={onChange}
      value={value.toString()}
      id={id}
    />
    {`${value ? 'Hide' : 'Show'} ${name}`}
  </label>
);

export default function Playground() {
  const initialState = {
    isBannerShown: true,
    isTopNavigationShown: true,
    isLeftPanelShown: true,
    isLeftSidebarShown: true,
    isMainShown: true,
    isRightSidebarShown: true,
    isRightPanelShown: true,
    isLeftPanelScrollable: false,
    isLeftSidebarScrollable: false,
    isMainScrollable: true,
    isMainExtraWide: false,
    isRightSidebarScrollable: false,
    isRightPanelScrollable: false,
  };
  const [gridState, setGridState] = useState(initialState);

  const toggleScrollable = (slotName: string) => {
    setGridState({
      ...gridState,
      [`is${slotName}Scrollable`]: !gridState[`is${slotName}Scrollable`],
    });
  };
  const toggleShown = (slotName: string) => {
    setGridState({
      ...gridState,
      [`is${slotName}Shown`]: !gridState[`is${slotName}Shown`],
    });
  };

  return (
    <>
      {gridState.isLeftPanelShown && (
        <ShellSidebar>
          <Wrapper borderColor="blue">ShellSidebar</Wrapper>
        </ShellSidebar>
      )}
      <ShellMain>
        {gridState.isBannerShown && (
          <ShellHeader>
            <Wrapper borderColor="gold">
              <h3 style={{ textAlign: 'center' }}>ShellHeader</h3>
            </Wrapper>
          </ShellHeader>
        )}
        <ShellBody>
          {gridState.isLeftSidebarShown && (
            <ShellSidebar>
              <Wrapper borderColor="turquoise">
                <p>ShellSidebar</p>
                <ToggleScrollableContent
                  onChange={() => toggleScrollable('LeftSidebar')}
                  value={gridState.isLeftSidebarScrollable}
                />
              </Wrapper>
            </ShellSidebar>
          )}
          {gridState.isMainShown && (
            <ShellMain>
              {gridState.isBannerShown && (
                <ShellHeader>
                  <Wrapper borderColor="gold">
                    <h3 style={{ textAlign: 'center' }}>ShellHeader</h3>
                  </Wrapper>
                </ShellHeader>
              )}
              <ShellBody>
                {gridState.isLeftSidebarShown && (
                  <ShellSidebar>
                    <Wrapper borderColor="turquoise">
                      <p>ShellSidebar</p>
                      <ToggleScrollableContent
                        onChange={() => toggleScrollable('LeftSidebar')}
                        value={gridState.isLeftSidebarScrollable}
                      />
                    </Wrapper>
                  </ShellSidebar>
                )}
                <ShellMain>
                  <ScrollableContainer scrollable>
                    <Wrapper borderColor="lightblue">
                      <p>ShellBody</p>
                      <ToggleScrollableContent
                        onChange={() => toggleScrollable('Main')}
                        value={gridState.isMainScrollable}
                      />
                    </Wrapper>
                  </ScrollableContainer>
                </ShellMain>
                {gridState.isRightSidebarShown && (
                  <ShellSidebar>
                    <Wrapper borderColor="black">
                      <p>ShellSidebar</p>
                      <ToggleScrollableContent
                        onChange={() => toggleScrollable('RightSidebar')}
                        value={gridState.isRightSidebarScrollable}
                      />
                    </Wrapper>
                  </ShellSidebar>
                )}
              </ShellBody>
              {gridState.isBannerShown && (
                <ShellFooter>
                  <Wrapper borderColor="gold">
                    <h3 style={{ textAlign: 'center' }}>ShellFooter</h3>
                  </Wrapper>
                </ShellFooter>
              )}
            </ShellMain>
          )}
          {gridState.isRightSidebarShown && (
            <ShellSidebar>
              <Wrapper borderColor="black">
                <p>ShellSidebar</p>
                <ToggleScrollableContent
                  onChange={() => toggleScrollable('RightSidebar')}
                  value={gridState.isRightSidebarScrollable}
                />
              </Wrapper>
            </ShellSidebar>
          )}
        </ShellBody>
        {gridState.isBannerShown && (
          <ShellFooter>
            <Wrapper borderColor="gold">
              <h3 style={{ textAlign: 'center' }}>ShellFooter</h3>
            </Wrapper>
          </ShellFooter>
        )}
      </ShellMain>

      {gridState.isRightPanelShown && (
        <ShellSidebar>
          <Wrapper borderColor="gray">ShellSidebar</Wrapper>
        </ShellSidebar>
      )}
      <div
        style={{
          position: 'fixed',
          bottom: '1rem',
          left: '0%',
          // transform: 'translate(-50%)',
          backgroundColor: 'white',
          padding: '1rem',
          border: '1px solid lightgray',
          zIndex: 2,
          borderRadius: 3,
        }}
      >
        <ToggleShown
          name="Banner"
          onChange={() => toggleShown('Banner')}
          value={gridState.isBannerShown}
        />
        <ToggleShown
          name="TopNavigation"
          onChange={() => toggleShown('TopNavigation')}
          value={gridState.isTopNavigationShown}
        />
        <ToggleShown
          name="LeftPanel"
          onChange={() => toggleShown('LeftPanel')}
          value={gridState.isLeftPanelShown}
        />
        <ToggleShown
          name="LeftSidebar"
          onChange={() => toggleShown('LeftSidebar')}
          value={gridState.isLeftSidebarShown}
        />
        <ToggleShown
          name="Main"
          onChange={() => toggleShown('Main')}
          value={gridState.isMainShown}
          id="toggle-main"
        />
        <ToggleShown
          name="RightSidebar"
          onChange={() => toggleShown('RightSidebar')}
          value={gridState.isRightSidebarShown}
        />
        <ToggleShown
          name="RightPanel"
          onChange={() => toggleShown('RightPanel')}
          value={gridState.isRightPanelShown}
        />
      </div>
    </>
  );
}
