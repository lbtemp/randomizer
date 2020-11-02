import React from 'react';
import ReactDOM from 'react-dom';
import PickerApp from './components/PickerApp';
import 'normalize.css/normalize.css'
import './styles/styles.scss'

ReactDOM.render(<PickerApp items={['Kire', 'Kire ?']} />, document.getElementById('app'));