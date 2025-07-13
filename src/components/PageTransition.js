import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import './page-transition.css';

function PageTransition({ children }) {
  const location = useLocation();
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        classNames="fade-slide"
        timeout={400}
        unmountOnExit
      >
        {(state, childProps, ref) => (
          <div ref={ref}>
            {children}
          </div>
        )}
      </CSSTransition>
    </SwitchTransition>
  );
}

export default PageTransition;
