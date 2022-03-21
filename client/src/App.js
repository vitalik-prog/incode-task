import React from 'react';
import { useSelector } from 'react-redux';
import MainContainer from 'src/containers/pages/main';
import Modals from 'src/containers/modals/index';

function App() {
  const { modalName } = useSelector(state => ({
    modalName: state.modal.name
  }));

  return (
    <>
      <MainContainer />
      {modalName && <Modals />}
    </>
  );
}

export default App;
