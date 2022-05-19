import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

// error handler
const willError = async (f) => {
    let e;
    try {
        await f();
        e = false;
    } catch (te) {
        e = te;
    }
    if ( e === false ) {
        throw Error(`Expected to error, but didn't`);
    }
    console.log(`That last call errored and that's okay`);
};

const stdlib = loadStdlib(process.env);
const sbal = stdlib.parseCurrency(100);
const users = await stdlib.newTestAccounts(3, sbal);
const accD = users[0];
const deadline = 100;

const ctcD = accD.contract(backend);

// constructor
try {
    await ctcD.p.Admin({
        deadline,
        price: stdlib.parseCurrency(25),
        ready: () => {
            console.log('The contract is ready');
            throw 42;
        }
    });
} catch (e) {
    if ( e !== 42) { 
        throw e;
    }
}

const makeMove = async (whoi, x, y) => {
	const who = users[whoi];
    await stdlib.balanceOf(who);
	const contract = await who.contract(backend, ctcD.getInfo());
	console.log('making move for ', stdlib.formatAddress(who));
	await contract.apis.Attendee.makeMove(stdlib.bigNumberify(x), stdlib.bigNumberify(y));
}
const timesup = async () => {
    console.log('I think time is up');
    await ctcD.apis.Checkin.timesUp();
};

await makeMove(1, 11, 11);
// await willError(() => makeMove(1, 11, 2));
// await rsvp(0);
// await rsvp(1);
// await rsvp(2);
// await rsvp(4);
// await willError(() => rsvp(4));
// await checkin(4);
// await checkin(0);
// await willError(() => checkin(3));
// await checkin(2);
// await willError(() => checkin(2));

console.log(`We're gonna wait for the deadline`);
await stdlib.wait(deadline);

await timesup();

for ( const who of [ accD, ...users ]) {
    console.warn(stdlib.formatAddress(who), 'has',
        stdlib.formatCurrency(await stdlib.balanceOf(who)));
}