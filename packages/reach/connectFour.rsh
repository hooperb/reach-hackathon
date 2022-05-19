"reach 0.1";
"use strict";

export const main = Reach.App(() => {
	const D = Participant("Admin", {
		price: UInt,
		deadline: UInt,
		ready: Fun([], Null),
	});

	const A = API("Checkin", {
		testing: Fun([UInt], Bool),
		timesUp: Fun([], Bool),
	});

	init();

	D.only(() => {
		const price = declassify(interact.price);
		const deadline = declassify(interact.deadline);
	});

	D.publish(price, deadline);
	D.interact.ready();

	const [keepGoing] = parallelReduce([true])
		.invariant(price < 1000000)
		.while(keepGoing)
		.api(
			A.testing,
			(x) => {
				check(x > 15, "Big ish number");
				console.log(x);
			},
			(_) => 0,
			(x, k) => {
				check(x > 15, "Big ish number");
				k(true);
				return [keepGoing];
			}
		)
		.timeout(absoluteTime(deadline), () => {
			const [[], k] = call(A.timesUp);
			k(true);
			return [false, keepGoing];
		});
});
