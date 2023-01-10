import { useEditor, useNode } from '@craftjs/core';
import { ChevronUpDownIcon, TrashIcon } from '@heroicons/react/24/solid';
import Portal from '@uidu/portal';
import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

const IndicatorDiv = styled.div`
  height: 30px;
  margin-top: -29px;
  font-size: 12px;
  line-height: 12px;

  svg {
    fill: #fff;
    width: 15px;
    height: 15px;
  }
`;

const Btn = styled.a`
  padding: 0 0px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  > div {
    position: relative;
    top: -50%;
    left: -50%;
  }
`;

export default function RenderNode({ render }) {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent('selected').contains(id),
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  const currentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add('component-selected');
      else dom.classList.remove('component-selected');
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  useEffect(() => {
    document
      .querySelector('.craftjs-renderer')
      .addEventListener('scroll', scroll);

    return () => {
      if (document.querySelector('.craftjs-renderer')) {
        document
          .querySelector('.craftjs-renderer')
          .removeEventListener('scroll', scroll);
      }
    };
  }, [scroll]);

  return (
    <>
      {isHover || isActive ? (
        <Portal>
          <IndicatorDiv
            ref={currentRef}
            tw="fixed flex items-center px-2 py-2 text-white bg-primary"
            style={{
              left: getPos(dom).left,
              top: getPos(dom).top,
              zIndex: 9999,
            }}
          >
            <h2 tw="flex-1 mr-4">{name}</h2>
            {moveable ? (
              <Btn tw="mr-2 cursor-move" ref={drag}>
                <ChevronUpDownIcon tw="h-5 w-5" />
              </Btn>
            ) : null}
            {deletable ? (
              <Btn
                tw="cursor-pointer"
                onMouseDown={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  actions.delete(id);
                }}
              >
                <TrashIcon tw="h-5 w-5" />
              </Btn>
            ) : null}
          </IndicatorDiv>
        </Portal>
      ) : null}
      {render}
    </>
  );
}
