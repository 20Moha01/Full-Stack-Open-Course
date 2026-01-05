import ReactDom from "react-dom/client";

import App from "./App";

// ReactDom.createRoot te permite crear una raíz para renderizar componentes React
// El método .render renderiza el contenido del componente App definido en App.jsx.
ReactDom.createRoot(document.getElementById('root')).render(<App />);

