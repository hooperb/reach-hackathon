import "./App.css";
import Board from "./components/Board";

import { loadStdlib } from "@reach-sh/stdlib";
import MyAlgoConnect from "@reach-sh/stdlib/ALGO_MyAlgoConnect";

if (process.env) {
	console.log(process.env);
}
// const stdlib = loadStdlib();
// const providerEnv = undefined; // 'TestNet'
// stdlib.setWalletFallback(
//   if(reach) {
//     reach.walletFallback({
//       providerEnv,
//       MyAlgoConnect,
//     })
//   }
// );

function App() {
	return (
		<div className="App">
			<div className="Game">
				<Board />
			</div>
		</div>
	);
}

export default App;
