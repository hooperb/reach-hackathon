// Automatically generated with Reach 0.1.10 (84dc282c)
/* eslint-disable */
export const _version = "0.1.10";
export const _versionHash = "0.1.10 (84dc282c)";
export const _backendVersion = 15;

export function getExports(s) {
	const stdlib = s.reachStdlib;
	return {};
}
export function _getEvents(s) {
	const stdlib = s.reachStdlib;
	return {};
}
export function _getViews(s, viewlib) {
	const stdlib = s.reachStdlib;
	const ctc0 = stdlib.T_Address;
	const ctc1 = stdlib.T_UInt;
	const ctc2 = stdlib.T_Null;
	const ctc3 = stdlib.T_Bool;
	const ctc4 = stdlib.T_Object({
		came: ctc3,
	});
	const ctc5 = stdlib.T_Data({
		None: ctc2,
		Some: ctc4,
	});
	const map0_ctc = ctc5;

	return {
		infos: {},
		views: {
			3: [ctc0, ctc1, ctc1, ctc1],
		},
	};
}
export function _getMaps(s) {
	const stdlib = s.reachStdlib;
	const ctc0 = stdlib.T_Null;
	const ctc1 = stdlib.T_Bool;
	const ctc2 = stdlib.T_Object({
		came: ctc1,
	});
	const ctc3 = stdlib.T_Data({
		None: ctc0,
		Some: ctc2,
	});
	const ctc4 = stdlib.T_Tuple([ctc3]);
	return {
		mapDataTy: ctc4,
	};
}
export async function Admin(ctcTop, interact) {
	if (typeof ctcTop !== "object" || ctcTop._initialize === undefined) {
		return Promise.reject(
			new Error(
				`The backend for Admin expects to receive a contract as its first argument.`
			)
		);
	}
	if (typeof interact !== "object") {
		return Promise.reject(
			new Error(
				`The backend for Admin expects to receive an interact object as its second argument.`
			)
		);
	}
	const ctc = ctcTop._initialize();
	const stdlib = ctc.stdlib;
	const ctc0 = stdlib.T_Null;
	const ctc1 = stdlib.T_Bool;
	const ctc2 = stdlib.T_Object({
		came: ctc1,
	});
	const ctc3 = stdlib.T_Data({
		None: ctc0,
		Some: ctc2,
	});
	const ctc4 = stdlib.T_UInt;
	const ctc5 = stdlib.T_Tuple([]);
	const ctc6 = stdlib.T_Address;
	const ctc7 = stdlib.T_Tuple([ctc6]);
	const ctc8 = stdlib.T_Data({
		Attendee_iWillGo0_65: ctc5,
		Checkin_theyCame0_65: ctc7,
	});

	const map0_ctc = ctc3;
	const map0 = stdlib.newMap({
		ctc: ctc,
		idx: 0,
		isAPI: false,
		ty: map0_ctc,
	});

	const v272 = stdlib.protect(
		ctc4,
		interact.deadline,
		"for Admin's interact field deadline"
	);
	const v273 = stdlib.protect(
		ctc4,
		interact.price,
		"for Admin's interact field price"
	);

	const v276 = stdlib.lt(
		v273,
		stdlib.checkedBigNumberify(
			"./index.rsh:22:31:decimal",
			stdlib.UInt_max,
			"100000000"
		)
	);
	stdlib.assert(v276, {
		at: "./index.rsh:22:22:application",
		fs: [
			"at ./index.rsh:19:15:application call to [unknown function] (defined at: ./index.rsh:19:19:function exp)",
		],
		msg: null,
		who: "Admin",
	});

	const txn1 = await ctc.sendrecv({
		args: [v273, v272],
		evt_cnt: 2,
		funcNum: 0,
		lct: stdlib.checkedBigNumberify(
			"./index.rsh:24:11:dot",
			stdlib.UInt_max,
			"0"
		),
		onlyIf: true,
		out_tys: [ctc4, ctc4],
		pay: [
			stdlib.checkedBigNumberify(
				"./index.rsh:24:11:decimal",
				stdlib.UInt_max,
				"0"
			),
			[],
		],
		sim_p: async (txn1) => {
			const sim_r = { txns: [], mapRefs: [], maps: [] };
			let sim_txn_ctr = stdlib.UInt_max;
			const getSimTokCtr = () => {
				sim_txn_ctr = sim_txn_ctr.sub(1);
				return sim_txn_ctr;
			};

			stdlib.simMapDupe(sim_r, 0, map0);

			const {
				data: [v278, v279],
				secs: v281,
				time: v280,
				didSend: v30,
				from: v277,
			} = txn1;

			const v284 = stdlib.checkedBigNumberify(
				"./index.rsh:34:60:decimal",
				stdlib.UInt_max,
				"0"
			);
			const v285 = true;
			const v286 = v280;

			if (
				await (async () => {
					return v285;
				})()
			) {
				sim_r.isHalt = false;
			} else {
				const v441 = stdlib.mul(v284, v278);
				sim_r.txns.push({
					amt: v441,
					kind: "from",
					to: v277,
					tok: undefined /* Nothing */,
				});
				sim_r.txns.push({
					kind: "halt",
					tok: undefined /* Nothing */,
				});
				sim_r.isHalt = true;
			}
			return sim_r;
		},
		soloSend: true,
		timeoutAt: undefined /* mto */,
		tys: [ctc4, ctc4],
		waitIfNotPresent: false,
	});
	const {
		data: [v278, v279],
		secs: v281,
		time: v280,
		didSend: v30,
		from: v277,
	} = txn1;
	stdlib.protect(ctc0, await interact.ready(), {
		at: "./index.rsh:25:25:application",
		fs: [
			"at ./index.rsh:25:25:application call to [unknown function] (defined at: ./index.rsh:25:25:function exp)",
			'at ./index.rsh:25:25:application call to "liftedInteract" (defined at: ./index.rsh:25:25:application)',
		],
		msg: "ready",
		who: "Admin",
	});

	const v283 = stdlib.lt(
		v278,
		stdlib.checkedBigNumberify(
			"./index.rsh:26:23:decimal",
			stdlib.UInt_max,
			"100000000"
		)
	);
	stdlib.assert(v283, {
		at: "./index.rsh:26:14:application",
		fs: [],
		msg: null,
		who: "Admin",
	});
	let v284 = stdlib.checkedBigNumberify(
		"./index.rsh:34:60:decimal",
		stdlib.UInt_max,
		"0"
	);
	let v285 = true;
	let v286 = v280;

	while (
		await (async () => {
			return v285;
		})()
	) {
		const txn2 = await ctc.recv({
			didSend: false,
			evt_cnt: 1,
			funcNum: 2,
			out_tys: [ctc8],
			timeoutAt: ["time", v279],
			waitIfNotPresent: false,
		});
		if (txn2.didTimeout) {
			const txn3 = await ctc.recv({
				didSend: false,
				evt_cnt: 1,
				funcNum: 3,
				out_tys: [ctc5],
				timeoutAt: undefined /* mto */,
				waitIfNotPresent: false,
			});
			const {
				data: [v431],
				secs: v433,
				time: v432,
				didSend: v244,
				from: v430,
			} = txn3;
			undefined /* setApiDetails */;
			const v434 = true;
			await txn3.getOutput("Checkin_timesUp", "v434", ctc1, v434);
			const cv284 = v284;
			const cv285 = false;
			const cv286 = v432;

			v284 = cv284;
			v285 = cv285;
			v286 = cv286;

			continue;
		} else {
			const {
				data: [v338],
				secs: v340,
				time: v339,
				didSend: v179,
				from: v337,
			} = txn2;
			switch (v338[0]) {
				case "Attendee_iWillGo0_65": {
					const v341 = v338[1];
					undefined /* setApiDetails */;
					const v351 = stdlib.protect(
						map0_ctc,
						await stdlib.mapRef(map0, v337),
						null
					);
					let v352;
					switch (v351[0]) {
						case "None": {
							const v353 = v351[1];
							v352 = true;

							break;
						}
						case "Some": {
							const v354 = v351[1];
							v352 = false;

							break;
						}
					}
					stdlib.assert(v352, {
						at: "./index.rsh:45:38:application",
						fs: [
							"at ./index.rsh:44:29:application call to [unknown function] (defined at: ./index.rsh:44:29:function exp)",
						],
						msg: "they haven't rsvpd",
						who: "Admin",
					});
					const v355 = {
						came: false,
					};
					await stdlib.mapSet(map0, v337, v355);
					const v356 = true;
					await txn2.getOutput("Attendee_iWillGo", "v356", ctc1, v356);
					const v362 = stdlib.add(
						v284,
						stdlib.checkedBigNumberify(
							"./index.rsh:48:62:decimal",
							stdlib.UInt_max,
							"1"
						)
					);
					const cv284 = v362;
					const cv285 = true;
					const cv286 = v339;

					v284 = cv284;
					v285 = cv285;
					v286 = cv286;

					continue;
					break;
				}
				case "Checkin_theyCame0_65": {
					const v384 = v338[1];
					undefined /* setApiDetails */;
					const v408 =
						v384[
							stdlib.checkedBigNumberify(
								"./index.rsh:51:21:spread",
								stdlib.UInt_max,
								"0"
							)
						];
					const v409 = stdlib.protect(
						map0_ctc,
						await stdlib.mapRef(map0, v408),
						null
					);
					let v410;
					switch (v409[0]) {
						case "None": {
							const v411 = v409[1];
							v410 = false;

							break;
						}
						case "Some": {
							const v412 = v409[1];
							v410 = true;

							break;
						}
					}
					stdlib.assert(v410, {
						at: "./index.rsh:59:38:application",
						fs: [
							"at ./index.rsh:58:34:application call to [unknown function] (defined at: ./index.rsh:58:34:function exp)",
						],
						msg: "they rsvpd",
						who: "Admin",
					});
					const v413 = stdlib.addressEq(v337, v277);
					stdlib.assert(v413, {
						at: "./index.rsh:60:38:application",
						fs: [
							"at ./index.rsh:58:34:application call to [unknown function] (defined at: ./index.rsh:58:34:function exp)",
						],
						msg: "you are the boss",
						who: "Admin",
					});
					await stdlib.mapSet(map0, v408, undefined /* Nothing */);
					const v418 = true;
					await txn2.getOutput("Checkin_theyCame", "v418", ctc1, v418);
					const v425 = stdlib.sub(
						v284,
						stdlib.checkedBigNumberify(
							"./index.rsh:64:62:decimal",
							stdlib.UInt_max,
							"1"
						)
					);
					const cv284 = v425;
					const cv285 = true;
					const cv286 = v339;

					v284 = cv284;
					v285 = cv285;
					v286 = cv286;

					continue;
					break;
				}
			}
		}
	}
	const v441 = stdlib.mul(v284, v278);
	return;
}
export async function _Attendee_iWillGo3(ctcTop, interact) {
	if (typeof ctcTop !== "object" || ctcTop._initialize === undefined) {
		return Promise.reject(
			new Error(
				`The backend for _Attendee_iWillGo3 expects to receive a contract as its first argument.`
			)
		);
	}
	if (typeof interact !== "object") {
		return Promise.reject(
			new Error(
				`The backend for _Attendee_iWillGo3 expects to receive an interact object as its second argument.`
			)
		);
	}
	const ctc = ctcTop._initialize();
	const stdlib = ctc.stdlib;
	const ctc0 = stdlib.T_Null;
	const ctc1 = stdlib.T_Bool;
	const ctc2 = stdlib.T_Object({
		came: ctc1,
	});
	const ctc3 = stdlib.T_Data({
		None: ctc0,
		Some: ctc2,
	});
	const ctc4 = stdlib.T_Address;
	const ctc5 = stdlib.T_UInt;
	const ctc6 = stdlib.T_Tuple([]);
	const ctc7 = stdlib.T_Tuple([ctc4]);
	const ctc8 = stdlib.T_Data({
		Attendee_iWillGo0_65: ctc6,
		Checkin_theyCame0_65: ctc7,
	});

	const map0_ctc = ctc3;
	const map0 = stdlib.newMap({
		ctc: ctc,
		idx: 0,
		isAPI: true,
		ty: map0_ctc,
	});

	const [v277, v278, v279, v284] = await ctc.getState(
		stdlib.checkedBigNumberify("<builtin>", stdlib.UInt_max, "3"),
		[ctc4, ctc5, ctc5, ctc5]
	);
	const v306 = ctc.selfAddress();
	const v308 = stdlib.protect(ctc6, await interact.in(), {
		at: "./index.rsh:1:23:application",
		fs: [
			"at ./index.rsh:40:28:application call to [unknown function] (defined at: ./index.rsh:40:28:function exp)",
			'at ./index.rsh:34:52:application call to "runAttendee_iWillGo0_65" (defined at: ./index.rsh:38:21:function exp)',
			"at ./index.rsh:34:52:application call to [unknown function] (defined at: ./index.rsh:34:52:function exp)",
		],
		msg: "in",
		who: "Attendee_iWillGo",
	});
	const v310 = stdlib.protect(map0_ctc, await stdlib.mapRef(map0, v306), null);
	let v311;
	switch (v310[0]) {
		case "None": {
			const v312 = v310[1];
			v311 = true;

			break;
		}
		case "Some": {
			const v313 = v310[1];
			v311 = false;

			break;
		}
	}
	stdlib.assert(v311, {
		at: "./index.rsh:41:38:application",
		fs: [
			"at ./index.rsh:40:28:application call to [unknown function] (defined at: ./index.rsh:40:28:function exp)",
			"at ./index.rsh:40:28:application call to [unknown function] (defined at: ./index.rsh:40:28:function exp)",
			'at ./index.rsh:34:52:application call to "runAttendee_iWillGo0_65" (defined at: ./index.rsh:38:21:function exp)',
			"at ./index.rsh:34:52:application call to [unknown function] (defined at: ./index.rsh:34:52:function exp)",
		],
		msg: "they haven't rsvpd",
		who: "Attendee_iWillGo",
	});
	const v316 = ["Attendee_iWillGo0_65", v308];

	const txn1 = await ctc.sendrecv({
		args: [v277, v278, v279, v284, v316],
		evt_cnt: 1,
		funcNum: 2,
		lct: stdlib.checkedBigNumberify("<builtin>", stdlib.UInt_max, "0"),
		onlyIf: true,
		out_tys: [ctc8],
		pay: [v278, []],
		sim_p: async (txn1) => {
			const sim_r = { txns: [], mapRefs: [], maps: [] };
			let sim_txn_ctr = stdlib.UInt_max;
			const getSimTokCtr = () => {
				sim_txn_ctr = sim_txn_ctr.sub(1);
				return sim_txn_ctr;
			};

			stdlib.simMapDupe(sim_r, 0, map0);

			const {
				data: [v338],
				secs: v340,
				time: v339,
				didSend: v179,
				from: v337,
			} = txn1;

			switch (v338[0]) {
				case "Attendee_iWillGo0_65": {
					const v341 = v338[1];
					sim_r.txns.push({
						kind: "api",
						who: "Attendee_iWillGo",
					});
					sim_r.txns.push({
						amt: v278,
						kind: "to",
						tok: undefined /* Nothing */,
					});
					stdlib.protect(
						map0_ctc,
						await stdlib.simMapRef(sim_r, 0, v337),
						null
					);
					const v355 = {
						came: false,
					};
					await stdlib.simMapSet(sim_r, 0, v337, v355);
					const v356 = true;
					const v357 = await txn1.getOutput(
						"Attendee_iWillGo",
						"v356",
						ctc1,
						v356
					);

					const v362 = stdlib.add(
						v284,
						stdlib.checkedBigNumberify(
							"./index.rsh:48:62:decimal",
							stdlib.UInt_max,
							"1"
						)
					);
					const v851 = v362;
					sim_r.isHalt = false;

					break;
				}
				case "Checkin_theyCame0_65": {
					const v384 = v338[1];

					break;
				}
			}
			return sim_r;
		},
		soloSend: false,
		timeoutAt: undefined /* mto */,
		tys: [ctc4, ctc5, ctc5, ctc5, ctc8],
		waitIfNotPresent: false,
	});
	const {
		data: [v338],
		secs: v340,
		time: v339,
		didSend: v179,
		from: v337,
	} = txn1;
	switch (v338[0]) {
		case "Attendee_iWillGo0_65": {
			const v341 = v338[1];
			undefined /* setApiDetails */;
			const v351 = stdlib.protect(
				map0_ctc,
				await stdlib.mapRef(map0, v337),
				null
			);
			let v352;
			switch (v351[0]) {
				case "None": {
					const v353 = v351[1];
					v352 = true;

					break;
				}
				case "Some": {
					const v354 = v351[1];
					v352 = false;

					break;
				}
			}
			stdlib.assert(v352, {
				at: "./index.rsh:45:38:application",
				fs: [
					"at ./index.rsh:44:29:application call to [unknown function] (defined at: ./index.rsh:44:29:function exp)",
				],
				msg: "they haven't rsvpd",
				who: "Attendee_iWillGo",
			});
			const v355 = {
				came: false,
			};
			await stdlib.mapSet(map0, v337, v355);
			const v356 = true;
			const v357 = await txn1.getOutput("Attendee_iWillGo", "v356", ctc1, v356);
			if (v179) {
				stdlib.protect(ctc0, await interact.out(v341, v357), {
					at: "./index.rsh:39:25:application",
					fs: [
						"at ./index.rsh:39:25:application call to [unknown function] (defined at: ./index.rsh:39:25:function exp)",
						'at ./index.rsh:47:34:application call to "k" (defined at: ./index.rsh:44:29:function exp)',
						"at ./index.rsh:44:29:application call to [unknown function] (defined at: ./index.rsh:44:29:function exp)",
					],
					msg: "out",
					who: "Attendee_iWillGo",
				});
			} else {
			}

			const v362 = stdlib.add(
				v284,
				stdlib.checkedBigNumberify(
					"./index.rsh:48:62:decimal",
					stdlib.UInt_max,
					"1"
				)
			);
			const v851 = v362;
			return;

			break;
		}
		case "Checkin_theyCame0_65": {
			const v384 = v338[1];
			return;
			break;
		}
	}
}
export async function _Checkin_theyCame3(ctcTop, interact) {
	if (typeof ctcTop !== "object" || ctcTop._initialize === undefined) {
		return Promise.reject(
			new Error(
				`The backend for _Checkin_theyCame3 expects to receive a contract as its first argument.`
			)
		);
	}
	if (typeof interact !== "object") {
		return Promise.reject(
			new Error(
				`The backend for _Checkin_theyCame3 expects to receive an interact object as its second argument.`
			)
		);
	}
	const ctc = ctcTop._initialize();
	const stdlib = ctc.stdlib;
	const ctc0 = stdlib.T_Null;
	const ctc1 = stdlib.T_Bool;
	const ctc2 = stdlib.T_Object({
		came: ctc1,
	});
	const ctc3 = stdlib.T_Data({
		None: ctc0,
		Some: ctc2,
	});
	const ctc4 = stdlib.T_Address;
	const ctc5 = stdlib.T_UInt;
	const ctc6 = stdlib.T_Tuple([ctc4]);
	const ctc7 = stdlib.T_Tuple([]);
	const ctc8 = stdlib.T_Data({
		Attendee_iWillGo0_65: ctc7,
		Checkin_theyCame0_65: ctc6,
	});

	const map0_ctc = ctc3;
	const map0 = stdlib.newMap({
		ctc: ctc,
		idx: 0,
		isAPI: true,
		ty: map0_ctc,
	});

	const [v277, v278, v279, v284] = await ctc.getState(
		stdlib.checkedBigNumberify("<builtin>", stdlib.UInt_max, "3"),
		[ctc4, ctc5, ctc5, ctc5]
	);
	const v318 = ctc.selfAddress();
	const v320 = stdlib.protect(ctc6, await interact.in(), {
		at: "./index.rsh:1:23:application",
		fs: [
			"at ./index.rsh:53:31:application call to [unknown function] (defined at: ./index.rsh:53:31:function exp)",
			'at ./index.rsh:34:52:application call to "runCheckin_theyCame0_65" (defined at: ./index.rsh:51:21:function exp)',
			"at ./index.rsh:34:52:application call to [unknown function] (defined at: ./index.rsh:34:52:function exp)",
		],
		msg: "in",
		who: "Checkin_theyCame",
	});
	const v321 =
		v320[
			stdlib.checkedBigNumberify(
				"./index.rsh:1:23:application",
				stdlib.UInt_max,
				"0"
			)
		];
	const v324 = stdlib.protect(map0_ctc, await stdlib.mapRef(map0, v321), null);
	let v325;
	switch (v324[0]) {
		case "None": {
			const v326 = v324[1];
			v325 = false;

			break;
		}
		case "Some": {
			const v327 = v324[1];
			v325 = true;

			break;
		}
	}
	stdlib.assert(v325, {
		at: "./index.rsh:54:38:application",
		fs: [
			"at ./index.rsh:53:31:application call to [unknown function] (defined at: ./index.rsh:53:31:function exp)",
			"at ./index.rsh:53:31:application call to [unknown function] (defined at: ./index.rsh:53:31:function exp)",
			'at ./index.rsh:34:52:application call to "runCheckin_theyCame0_65" (defined at: ./index.rsh:51:21:function exp)',
			"at ./index.rsh:34:52:application call to [unknown function] (defined at: ./index.rsh:34:52:function exp)",
		],
		msg: "they rsvpd",
		who: "Checkin_theyCame",
	});
	const v328 = stdlib.addressEq(v318, v277);
	stdlib.assert(v328, {
		at: "./index.rsh:55:38:application",
		fs: [
			"at ./index.rsh:53:31:application call to [unknown function] (defined at: ./index.rsh:53:31:function exp)",
			"at ./index.rsh:53:31:application call to [unknown function] (defined at: ./index.rsh:53:31:function exp)",
			'at ./index.rsh:34:52:application call to "runCheckin_theyCame0_65" (defined at: ./index.rsh:51:21:function exp)',
			"at ./index.rsh:34:52:application call to [unknown function] (defined at: ./index.rsh:34:52:function exp)",
		],
		msg: "you are the boss",
		who: "Checkin_theyCame",
	});
	const v332 = ["Checkin_theyCame0_65", v320];

	const txn1 = await ctc.sendrecv({
		args: [v277, v278, v279, v284, v332],
		evt_cnt: 1,
		funcNum: 2,
		lct: stdlib.checkedBigNumberify("<builtin>", stdlib.UInt_max, "0"),
		onlyIf: true,
		out_tys: [ctc8],
		pay: [
			stdlib.checkedBigNumberify(
				"./index.rsh:57:32:decimal",
				stdlib.UInt_max,
				"0"
			),
			[],
		],
		sim_p: async (txn1) => {
			const sim_r = { txns: [], mapRefs: [], maps: [] };
			let sim_txn_ctr = stdlib.UInt_max;
			const getSimTokCtr = () => {
				sim_txn_ctr = sim_txn_ctr.sub(1);
				return sim_txn_ctr;
			};

			stdlib.simMapDupe(sim_r, 0, map0);

			const {
				data: [v338],
				secs: v340,
				time: v339,
				didSend: v179,
				from: v337,
			} = txn1;

			switch (v338[0]) {
				case "Attendee_iWillGo0_65": {
					const v341 = v338[1];

					break;
				}
				case "Checkin_theyCame0_65": {
					const v384 = v338[1];
					sim_r.txns.push({
						kind: "api",
						who: "Checkin_theyCame",
					});
					const v408 =
						v384[
							stdlib.checkedBigNumberify(
								"./index.rsh:51:21:spread",
								stdlib.UInt_max,
								"0"
							)
						];
					stdlib.protect(
						map0_ctc,
						await stdlib.simMapRef(sim_r, 0, v408),
						null
					);
					sim_r.txns.push({
						amt: v278,
						kind: "from",
						to: v408,
						tok: undefined /* Nothing */,
					});
					await stdlib.simMapSet(sim_r, 0, v408, undefined /* Nothing */);
					const v418 = true;
					const v419 = await txn1.getOutput(
						"Checkin_theyCame",
						"v418",
						ctc1,
						v418
					);

					const v425 = stdlib.sub(
						v284,
						stdlib.checkedBigNumberify(
							"./index.rsh:64:62:decimal",
							stdlib.UInt_max,
							"1"
						)
					);
					const v863 = v425;
					sim_r.isHalt = false;

					break;
				}
			}
			return sim_r;
		},
		soloSend: false,
		timeoutAt: undefined /* mto */,
		tys: [ctc4, ctc5, ctc5, ctc5, ctc8],
		waitIfNotPresent: false,
	});
	const {
		data: [v338],
		secs: v340,
		time: v339,
		didSend: v179,
		from: v337,
	} = txn1;
	switch (v338[0]) {
		case "Attendee_iWillGo0_65": {
			const v341 = v338[1];
			return;
			break;
		}
		case "Checkin_theyCame0_65": {
			const v384 = v338[1];
			undefined /* setApiDetails */;
			const v408 =
				v384[
					stdlib.checkedBigNumberify(
						"./index.rsh:51:21:spread",
						stdlib.UInt_max,
						"0"
					)
				];
			const v409 = stdlib.protect(
				map0_ctc,
				await stdlib.mapRef(map0, v408),
				null
			);
			let v410;
			switch (v409[0]) {
				case "None": {
					const v411 = v409[1];
					v410 = false;

					break;
				}
				case "Some": {
					const v412 = v409[1];
					v410 = true;

					break;
				}
			}
			stdlib.assert(v410, {
				at: "./index.rsh:59:38:application",
				fs: [
					"at ./index.rsh:58:34:application call to [unknown function] (defined at: ./index.rsh:58:34:function exp)",
				],
				msg: "they rsvpd",
				who: "Checkin_theyCame",
			});
			const v413 = stdlib.addressEq(v337, v277);
			stdlib.assert(v413, {
				at: "./index.rsh:60:38:application",
				fs: [
					"at ./index.rsh:58:34:application call to [unknown function] (defined at: ./index.rsh:58:34:function exp)",
				],
				msg: "you are the boss",
				who: "Checkin_theyCame",
			});
			await stdlib.mapSet(map0, v408, undefined /* Nothing */);
			const v418 = true;
			const v419 = await txn1.getOutput("Checkin_theyCame", "v418", ctc1, v418);
			if (v179) {
				stdlib.protect(ctc0, await interact.out(v384, v419), {
					at: "./index.rsh:52:25:application",
					fs: [
						"at ./index.rsh:52:25:application call to [unknown function] (defined at: ./index.rsh:52:25:function exp)",
						'at ./index.rsh:63:34:application call to "k" (defined at: ./index.rsh:58:34:function exp)',
						"at ./index.rsh:58:34:application call to [unknown function] (defined at: ./index.rsh:58:34:function exp)",
					],
					msg: "out",
					who: "Checkin_theyCame",
				});
			} else {
			}

			const v425 = stdlib.sub(
				v284,
				stdlib.checkedBigNumberify(
					"./index.rsh:64:62:decimal",
					stdlib.UInt_max,
					"1"
				)
			);
			const v863 = v425;
			return;

			break;
		}
	}
}
export async function _Checkin_timesUp3(ctcTop, interact) {
	if (typeof ctcTop !== "object" || ctcTop._initialize === undefined) {
		return Promise.reject(
			new Error(
				`The backend for _Checkin_timesUp3 expects to receive a contract as its first argument.`
			)
		);
	}
	if (typeof interact !== "object") {
		return Promise.reject(
			new Error(
				`The backend for _Checkin_timesUp3 expects to receive an interact object as its second argument.`
			)
		);
	}
	const ctc = ctcTop._initialize();
	const stdlib = ctc.stdlib;
	const ctc0 = stdlib.T_Null;
	const ctc1 = stdlib.T_Bool;
	const ctc2 = stdlib.T_Object({
		came: ctc1,
	});
	const ctc3 = stdlib.T_Data({
		None: ctc0,
		Some: ctc2,
	});
	const ctc4 = stdlib.T_Address;
	const ctc5 = stdlib.T_UInt;
	const ctc6 = stdlib.T_Tuple([]);

	const map0_ctc = ctc3;
	const map0 = stdlib.newMap({
		ctc: ctc,
		idx: 0,
		isAPI: true,
		ty: map0_ctc,
	});

	const [v277, v278, v279, v284] = await ctc.getState(
		stdlib.checkedBigNumberify("<builtin>", stdlib.UInt_max, "3"),
		[ctc4, ctc5, ctc5, ctc5]
	);
	const v429 = stdlib.protect(ctc6, await interact.in(), {
		at: "./index.rsh:68:25:application",
		fs: [
			"at ./index.rsh:68:25:application call to [unknown function] (defined at: ./index.rsh:68:25:function exp)",
			"at ./index.rsh:67:53:application call to [unknown function] (defined at: ./index.rsh:67:53:function exp)",
		],
		msg: "in",
		who: "Checkin_timesUp",
	});

	const txn1 = await ctc.sendrecv({
		args: [v277, v278, v279, v284, v429],
		evt_cnt: 1,
		funcNum: 3,
		lct: stdlib.checkedBigNumberify("<builtin>", stdlib.UInt_max, "0"),
		onlyIf: true,
		out_tys: [ctc6],
		pay: [
			stdlib.checkedBigNumberify(
				"./index.rsh:68:25:decimal",
				stdlib.UInt_max,
				"0"
			),
			[],
		],
		sim_p: async (txn1) => {
			const sim_r = { txns: [], mapRefs: [], maps: [] };
			let sim_txn_ctr = stdlib.UInt_max;
			const getSimTokCtr = () => {
				sim_txn_ctr = sim_txn_ctr.sub(1);
				return sim_txn_ctr;
			};

			stdlib.simMapDupe(sim_r, 0, map0);

			const {
				data: [v431],
				secs: v433,
				time: v432,
				didSend: v244,
				from: v430,
			} = txn1;

			sim_r.txns.push({
				kind: "api",
				who: "Checkin_timesUp",
			});
			const v434 = true;
			const v435 = await txn1.getOutput("Checkin_timesUp", "v434", ctc1, v434);

			const v870 = stdlib.mul(v284, v278);
			sim_r.txns.push({
				amt: v870,
				kind: "from",
				to: v277,
				tok: undefined /* Nothing */,
			});
			sim_r.txns.push({
				kind: "halt",
				tok: undefined /* Nothing */,
			});
			sim_r.isHalt = true;

			return sim_r;
		},
		soloSend: false,
		timeoutAt: undefined /* mto */,
		tys: [ctc4, ctc5, ctc5, ctc5, ctc6],
		waitIfNotPresent: false,
	});
	const {
		data: [v431],
		secs: v433,
		time: v432,
		didSend: v244,
		from: v430,
	} = txn1;
	undefined /* setApiDetails */;
	const v434 = true;
	const v435 = await txn1.getOutput("Checkin_timesUp", "v434", ctc1, v434);
	stdlib.protect(ctc0, await interact.out(v431, v435), {
		at: "./index.rsh:68:25:application",
		fs: [
			"at ./index.rsh:68:25:application call to [unknown function] (defined at: ./index.rsh:68:25:function exp)",
			'at ./index.rsh:69:26:application call to "k" (defined at: ./index.rsh:68:25:function exp)',
			"at ./index.rsh:67:53:application call to [unknown function] (defined at: ./index.rsh:67:53:function exp)",
		],
		msg: "out",
		who: "Checkin_timesUp",
	});

	const v870 = stdlib.mul(v284, v278);
	return;
}
export async function Attendee_iWillGo(ctcTop, interact) {
	if (typeof ctcTop !== "object" || ctcTop._initialize === undefined) {
		return Promise.reject(
			new Error(
				`The backend for Attendee_iWillGo expects to receive a contract as its first argument.`
			)
		);
	}
	if (typeof interact !== "object") {
		return Promise.reject(
			new Error(
				`The backend for Attendee_iWillGo expects to receive an interact object as its second argument.`
			)
		);
	}
	const ctc = ctcTop._initialize();
	const stdlib = ctc.stdlib;
	const step = await ctc.getCurrentStep();
	stdlib.assert(
		step == 3,
		"API called in the wrong state. Currently in state: " +
			step +
			", expected:  [3]"
	);
	if (step == 3) {
		return _Attendee_iWillGo3(ctcTop, interact);
	}
}
export async function Checkin_theyCame(ctcTop, interact) {
	if (typeof ctcTop !== "object" || ctcTop._initialize === undefined) {
		return Promise.reject(
			new Error(
				`The backend for Checkin_theyCame expects to receive a contract as its first argument.`
			)
		);
	}
	if (typeof interact !== "object") {
		return Promise.reject(
			new Error(
				`The backend for Checkin_theyCame expects to receive an interact object as its second argument.`
			)
		);
	}
	const ctc = ctcTop._initialize();
	const stdlib = ctc.stdlib;
	const step = await ctc.getCurrentStep();
	stdlib.assert(
		step == 3,
		"API called in the wrong state. Currently in state: " +
			step +
			", expected:  [3]"
	);
	if (step == 3) {
		return _Checkin_theyCame3(ctcTop, interact);
	}
}
export async function Checkin_timesUp(ctcTop, interact) {
	if (typeof ctcTop !== "object" || ctcTop._initialize === undefined) {
		return Promise.reject(
			new Error(
				`The backend for Checkin_timesUp expects to receive a contract as its first argument.`
			)
		);
	}
	if (typeof interact !== "object") {
		return Promise.reject(
			new Error(
				`The backend for Checkin_timesUp expects to receive an interact object as its second argument.`
			)
		);
	}
	const ctc = ctcTop._initialize();
	const stdlib = ctc.stdlib;
	const step = await ctc.getCurrentStep();
	stdlib.assert(
		step == 3,
		"API called in the wrong state. Currently in state: " +
			step +
			", expected:  [3]"
	);
	if (step == 3) {
		return _Checkin_timesUp3(ctcTop, interact);
	}
}
const _ALGO = {
	ABI: {
		impure: [
			`Attendee_iWillGo()byte`,
			`Checkin_theyCame(address)byte`,
			`Checkin_timesUp()byte`,
		],
		pure: [],
		sigs: [
			`Attendee_iWillGo()byte`,
			`Checkin_theyCame(address)byte`,
			`Checkin_timesUp()byte`,
		],
	},
	appApproval: `BiAJAAEDCLuBwd8Cs/b77wMoIDAmBAEAAAEBAgAAIjUAMRhBAqgpZEkiWzUBJVs1AjEZIxJBAAgxACgrZkICdzYaABdJQQBBIjUEIzUGSSEEDEAAKEkhBQxAABEhBRJEKTX/KDT/UDIDUEIAjyEEEkQ2GgE1/yo0/1BCAH+BhPWXkQESRClCAB02GgIXNQQ2GgM2GgEXSYECDEABT0kkDEAAWCQSRCQ0ARJENARJIhJMNAISEUQoZEk1AyEGWzX/STUFNf6ABMiaD7s0/lCwMgY0/w9EgAkAAAAAAAABsgGwKjUHNANXACA0AyEHWzT/NAMhCFsiMgZCATxIJDQBEkQ0BEkiEkw0AhIRRChkSTUDSUpXACA1/yEHWzX+IQZbNf0hCFs1/Ek1BTX7gASixbPbNPtQsDIGNP0MRDT7IlVAAEg0/ogBnDEAiAGKSTX5IlVAAAYjNfpCAAYiNfpCAAA0+kQxACiAAgEAZoAJAAAAAAAAAWQBsCo1BzT/NP40/TT8IwgjMgZCAKw0+1cBIDX6NPo1+TT5iAE8STX3IlVAAAYiNfhCAAYjNfhCAAA0+EQxADT/EkSxIrIBNP6yCCOyEDT5sgezNPkoK2aACQAAAAAAAAGiAbAqNQc0/zT+NP00/CMJIzIGQgBLIhJEIjQBEkQ0BEkiEkw0AhIRREk1BUkiWzX/JVs1/oAErNEfwzT/FlA0/hZQsIGgjQaIAMM0/4GAwtcvDEQxADT/NP4iIzIGQgAANf81/jX9Nfw1+zX6NP5BACA0+jT7FlA0/BZQNP0WUChLAVcAOGdIJDUBMgY1AkIAMrEisgE0/TT7C7III7IQNPqyB7NCAAAxGYEFEkSxIrIBIrIII7IQMgmyCTIKsgezQgAFMRkiEkQpNAEWNAIWUGc0BkEACoAEFR98dTQHULA0AEkjCDIEEkQxFhJEI0MxGSISREL/3yI1ASI1AkL/w0kxGGFAAANIK4koYok0AElKIwg1ADgHMgoSRDgQIxJEOAgSRIk=`,
	appClear: `Bg==`,
	companionInfo: null,
	extraPages: 0,
	mapDataKeys: 1,
	mapDataSize: 2,
	stateKeys: 1,
	stateSize: 56,
	unsupported: [],
	version: 10,
	warnings: [
		`This program was compiled with trustworthy maps, but maps are not trustworthy on Algorand, because they are represented with local state. A user can delete their local state at any time, by sending a ClearState transaction. The only way to use local state properly on Algorand is to ensure that a user doing this can only 'hurt' themselves and not the entire system.`,
	],
};
const _ETH = {
	ABI: `[
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v278",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v279",
                "type": "uint256"
              }
            ],
            "internalType": "struct T5",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T6",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "msg",
        "type": "uint256"
      }
    ],
    "name": "ReachError",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v278",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v279",
                "type": "uint256"
              }
            ],
            "internalType": "struct T5",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T6",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e0",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "enum _enum_T10",
                    "name": "which",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bool",
                    "name": "_Attendee_iWillGo0_65",
                    "type": "bool"
                  },
                  {
                    "components": [
                      {
                        "internalType": "address payable",
                        "name": "elem0",
                        "type": "address"
                      }
                    ],
                    "internalType": "struct T9",
                    "name": "_Checkin_theyCame0_65",
                    "type": "tuple"
                  }
                ],
                "internalType": "struct T10",
                "name": "v338",
                "type": "tuple"
              }
            ],
            "internalType": "struct T11",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T12",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e2",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "bool",
                "name": "v431",
                "type": "bool"
              }
            ],
            "internalType": "struct T13",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T14",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e3",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "v0",
        "type": "bool"
      }
    ],
    "name": "_reach_oe_v356",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "v0",
        "type": "bool"
      }
    ],
    "name": "_reach_oe_v418",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "v0",
        "type": "bool"
      }
    ],
    "name": "_reach_oe_v434",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "Attendee_iWillGo",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_a0",
        "type": "address"
      }
    ],
    "name": "Checkin_theyCame",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Checkin_timesUp",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCreationTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentState",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "_reachMap0Ref",
    "outputs": [
      {
        "components": [
          {
            "internalType": "enum _enum_T1",
            "name": "which",
            "type": "uint8"
          },
          {
            "internalType": "bool",
            "name": "_None",
            "type": "bool"
          },
          {
            "components": [
              {
                "internalType": "bool",
                "name": "_came",
                "type": "bool"
              }
            ],
            "internalType": "struct T0",
            "name": "_Some",
            "type": "tuple"
          }
        ],
        "internalType": "struct T1",
        "name": "res",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "enum _enum_T10",
                    "name": "which",
                    "type": "uint8"
                  },
                  {
                    "internalType": "bool",
                    "name": "_Attendee_iWillGo0_65",
                    "type": "bool"
                  },
                  {
                    "components": [
                      {
                        "internalType": "address payable",
                        "name": "elem0",
                        "type": "address"
                      }
                    ],
                    "internalType": "struct T9",
                    "name": "_Checkin_theyCame0_65",
                    "type": "tuple"
                  }
                ],
                "internalType": "struct T10",
                "name": "v338",
                "type": "tuple"
              }
            ],
            "internalType": "struct T11",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T12",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m2",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "bool",
                "name": "v431",
                "type": "bool"
              }
            ],
            "internalType": "struct T13",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T14",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m3",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]`,
	Bytecode: `0x60806040526040516200170c3803806200170c8339810160408190526200002691620003c1565b6000805543600355604080513381528251602080830191909152808401518051838501520151606082015290517fa736757a943474ef5983bb0422ab3a1e64bcd39e99635f4430c7765118231f959181900360800190a16200008b341560076200013c565b602081015151620000a4906305f5e1001160086200013c565b620000ef6040805160a0810182526000918101828152606082018390526080820192909252908190815260408051606081018252600080825260208281018290529282015291015290565b80513390526020808301805151835183015251810151825160409081019190915281830180516000905280516001930192909252905143910152620001348162000166565b50506200048c565b81620001625760405163100960cb60e01b81526004810182905260240160405180910390fd5b5050565b806020015160200151156200023a57620001aa604051806080016040528060006001600160a01b031681526020016000815260200160008152602001600081525090565b8151516001600160a01b0316808252825160209081015181840190815284516040908101518186019081528387015151606080880191825260036000554360015583519586019690965292519184019190915251928201929092529051608082015260a0016040516020818303038152906040526002908051906020019062000235929190620002aa565b505050565b8051805160209182015191830151516001600160a01b03909116916108fc9162000265919062000421565b6040518115909202916000818181858888f193505050501580156200028e573d6000803e3d6000fd5b5060008080556001819055620002a79060029062000339565b50565b828054620002b8906200044f565b90600052602060002090601f016020900481019282620002dc576000855562000327565b82601f10620002f757805160ff191683800117855562000327565b8280016001018555821562000327579182015b82811115620003275782518255916020019190600101906200030a565b506200033592915062000373565b5090565b50805462000347906200044f565b6000825580601f1062000358575050565b601f016020900490600052602060002090810190620002a791905b5b8082111562000335576000815560010162000374565b604080519081016001600160401b0381118282101715620003bb57634e487b7160e01b600052604160045260246000fd5b60405290565b60008183036060811215620003d557600080fd5b620003df6200038a565b835181526040601f1983011215620003f657600080fd5b620004006200038a565b60208581015182526040909501518582015293810193909352509092915050565b60008160001904831182151516156200044a57634e487b7160e01b600052601160045260246000fd5b500290565b600181811c908216806200046457607f821691505b602082108114156200048657634e487b7160e01b600052602260045260246000fd5b50919050565b611270806200049c6000396000f3fe6080604052600436106100845760003560e01c80634e634106116100565780634e63410614610114578063832307571461011c578063ab53f2c614610131578063af020d6314610154578063e2186a081461015c57005b806309c354e71461008d5780631e93b0f1146100a05780632fe76ef0146100c45780633bc5b7bf146100e757005b3661008b57005b005b61008b61009b366004610dcd565b61016f565b3480156100ac57600080fd5b506003545b6040519081526020015b60405180910390f35b6100d76100d2366004610dfa565b6101a8565b60405190151581526020016100bb565b3480156100f357600080fd5b50610107610102366004610dfa565b61021a565b6040516100bb9190610e52565b6100d7610231565b34801561012857600080fd5b506001546100b1565b34801561013d57600080fd5b5061014661027d565b6040516100bb929190610e85565b6100d761031a565b61008b61016a366004610ee2565b610376565b60408051606081018252600080825260208201819052918101919091526101a461019e36849003840184610f9d565b826103ab565b5050565b604080516060810182526000808252602082018190529181018290526101cc610c2b565b6101d4610c4a565b60408051602080820183526001600160a01b03881682528383019190915260018352815180820190925282825283015261020e82846103ab565b50506020015192915050565b610222610c4a565b61022b82610833565b92915050565b60408051606081018252600080825260208201819052918101829052610255610c76565b60408051602080820190925260008152908201526102738183610904565b5060400151919050565b60006060600054600280805461029290611049565b80601f01602080910402602001604051908101604052809291908181526020018280546102be90611049565b801561030b5780601f106102e05761010080835404028352916020019161030b565b820191906000526020600020905b8154815290600101906020018083116102ee57829003601f168201915b50505050509050915091509091565b6040805160608101825260008082526020820181905291810182905261033e610c2b565b610346610c4a565b60006020828101829052908252604080518083019091528281529083015261036e82846103ab565b505051919050565b60408051606081018252600080825260208201819052918101919091526101a46103a53684900384018461107e565b82610904565b6103bb600360005414600e610acb565b81516103d69015806103cf57508251600154145b600f610acb565b6000808055600280546103e890611049565b80601f016020809104026020016040519081016040528092919081815260200182805461041490611049565b80156104615780601f1061043657610100808354040283529160200191610461565b820191906000526020600020905b81548152906001019060200180831161044457829003601f168201915b50505050508060200190518101906104799190611102565b90506104bc604080516080810182526000808252825160208082018552828252808401919091528351908101845281815292820192909252606081019190915290565b6104cd826040015143106010610acb565b7f8bf2aed60119dd2c0f87648a213449ad860b94178447ea633456093ea216508733856040516104fe92919061117f565b60405180910390a1600060208501515151600181111561052057610520610e1e565b141561067457610537826020015134146009610acb565b600061054233610833565b51600181111561055457610554610e1e565b1415610563576001815261058b565b600161056e33610833565b51600181111561058057610580610e1e565b141561058b57600081525b805161059890600a610acb565b6020818101805160009081905233815260048352604090819020805460ff1990811660019081178355935151918401805492151592909116919091179055519081527fcb9c44f24ee1347d7dd92df349e1ee2de950b1561f824f60e4d7ae45edb56755910160405180910390a160018352610611610ca0565b825181516001600160a01b039091169052602080840151825190910152604080840151825190910152606083015161064b906001906111ec565b602080830180519290925281516001910152514360409091015261066e81610af0565b5061082d565b600160208501515151600181111561068e5761068e610e1e565b141561082d57602084015151604090810151908201526106b03415600b610acb565b60006040820151516106c190610833565b5160018111156106d3576106d3610e1e565b14156106e55760006060820152610716565b60016040820151516106f690610833565b51600181111561070857610708610e1e565b141561071657600160608201525b6107258160600151600c610acb565b815161073d906001600160a01b03163314600d610acb565b60408082015151602084015191516001600160a01b039091169180156108fc02916000818181858888f1935050505015801561077d573d6000803e3d6000fd5b50604081810151516001600160a01b031660009081526004602090815290829020805461ffff191681556001908101805460ff1916905591519182527fe5a39c4e2326ca3b4978846ed96c67288bff739bffc3b8ae90dbe4efb4893fef910160405180910390a1600160208401526107f3610ca0565b825181516001600160a01b039091169052602080840151825190910152604080840151825190910152606083015161064b90600190611204565b50505050565b61083b610c4a565b60016001600160a01b03831660009081526004602052604090205460ff16600181111561086a5761086a610e1e565b14156108f4576001600160a01b038216600090815260046020526040908190208151606081019092528054829060ff1660018111156108ab576108ab610e1e565b60018111156108bc576108bc610e1e565b81528154610100900460ff90811615156020808401919091526040805191820181526001909401549091161515815291015292915050565b600080825260208201525b919050565b6109146003600054146012610acb565b815161092f90158061092857508251600154145b6013610acb565b60008080556002805461094190611049565b80601f016020809104026020016040519081016040528092919081815260200182805461096d90611049565b80156109ba5780601f1061098f576101008083540402835291602001916109ba565b820191906000526020600020905b81548152906001019060200180831161099d57829003601f168201915b50505050508060200190518101906109d29190611102565b90506109e681604001514310156014610acb565b6040805133815284516020808301919091528501515115158183015290517fa5a264ad7bcb9788928e7795891942e9811712d8346314f9c3672363842f4e359181900360600190a1610a3a34156011610acb565b604051600181527f0a43eb641153829f058758a6c4b44f3d414f21aa5cb082bb9a0a35adfe84e20c9060200160405180910390a160016040830152610a7d610ca0565b815181516001600160a01b0390911690526020808301518251820152604080840151835182015260608401518284018051919091528051600093019290925290514391015261082d81610af0565b816101a45760405163100960cb60e01b81526004810182905260240160405180910390fd5b80602001516020015115610bc057610b32604051806080016040528060006001600160a01b031681526020016000815260200160008152602001600081525090565b8151516001600160a01b0316808252825160209081015181840190815284516040908101518186019081528387015151606080880191825260036000554360015583519586019690965292519184019190915251928201929092529051608082015260a00160405160208183030381529060405260029080519060200190610bbb929190610ce7565b505050565b8051805160209182015191830151516001600160a01b03909116916108fc91610be9919061121b565b6040518115909202916000818181858888f19350505050158015610c11573d6000803e3d6000fd5b5060008080556001819055610c2890600290610d6b565b50565b604051806040016040528060008152602001610c45610da5565b905290565b604080516060810190915280600081526000602080830182905260408051918201815291815291015290565b604051806040016040528060008152602001610c4560405180602001604052806000151581525090565b6040805160a0810182526000918101828152606082018390526080820192909252908190815260408051606081018252600080825260208281018290529282015291015290565b828054610cf390611049565b90600052602060002090601f016020900481019282610d155760008555610d5b565b82601f10610d2e57805160ff1916838001178555610d5b565b82800160010185558215610d5b579182015b82811115610d5b578251825591602001919060010190610d40565b50610d67929150610db8565b5090565b508054610d7790611049565b6000825580601f10610d87575050565b601f016020900490600052602060002090810190610c289190610db8565b6040518060200160405280610c45610c4a565b5b80821115610d675760008155600101610db9565b600060808284031215610ddf57600080fd5b50919050565b6001600160a01b0381168114610c2857600080fd5b600060208284031215610e0c57600080fd5b8135610e1781610de5565b9392505050565b634e487b7160e01b600052602160045260246000fd5b60028110610c2857634e487b7160e01b600052602160045260246000fd5b81516060820190610e6281610e34565b808352506020830151151560208301526040830151511515604083015292915050565b82815260006020604081840152835180604085015260005b81811015610eb957858101830151858201606001528201610e9d565b81811115610ecb576000606083870101525b50601f01601f191692909201606001949350505050565b600060408284031215610ddf57600080fd5b6040805190810167ffffffffffffffff81118282101715610f2557634e487b7160e01b600052604160045260246000fd5b60405290565b6040516020810167ffffffffffffffff81118282101715610f2557634e487b7160e01b600052604160045260246000fd5b6040516060810167ffffffffffffffff81118282101715610f2557634e487b7160e01b600052604160045260246000fd5b803580151581146108ff57600080fd5b60008183036080811215610fb057600080fd5b610fb8610ef4565b833581526060601f1983011215610fce57600080fd5b610fd6610f2b565b610fde610f5c565b602086013560028110610ff057600080fd5b8152610ffe60408701610f8d565b60208201526020605f198501121561101557600080fd5b61101d610f2b565b9350606086013561102d81610de5565b8452604081019390935291825260208101919091529392505050565b600181811c9082168061105d57607f821691505b60208210811415610ddf57634e487b7160e01b600052602260045260246000fd5b6000818303604081121561109157600080fd5b6040516040810181811067ffffffffffffffff821117156110c257634e487b7160e01b600052604160045260246000fd5b604052833581526020601f19830112156110db57600080fd5b6110e3610f2b565b91506110f160208501610f8d565b825260208101919091529392505050565b60006080828403121561111457600080fd5b6040516080810181811067ffffffffffffffff8211171561114557634e487b7160e01b600052604160045260246000fd5b604052825161115381610de5565b808252506020830151602082015260408301516040820152606083015160608201528091505092915050565b6001600160a01b038381168252825160208084019190915283015151805160a084019291906111ad81610e34565b806040860152506020810151151560608501528160408201515116608085015250509392505050565b634e487b7160e01b600052601160045260246000fd5b600082198211156111ff576111ff6111d6565b500190565b600082821015611216576112166111d6565b500390565b6000816000190483118215151615611235576112356111d6565b50029056fea264697066735822122013b31e94fe831fce92851af42e5bee5d5696d41fe0413c60494b495057f142d964736f6c634300080c0033`,
	BytecodeLen: 5900,
	Which: `oD`,
	version: 7,
	views: {},
};
export const _stateSourceMap = {
	2: {
		at: "./index.rsh:75:17:after expr stmt semicolon",
		fs: [],
		msg: null,
		who: "Module",
	},
	3: {
		at: "./index.rsh:34:52:after expr stmt semicolon",
		fs: [],
		msg: null,
		who: "Module",
	},
};
export const _Connectors = {
	ALGO: _ALGO,
	ETH: _ETH,
};
export const _Participants = {
	Admin: Admin,
	Attendee_iWillGo: Attendee_iWillGo,
	Checkin_theyCame: Checkin_theyCame,
	Checkin_timesUp: Checkin_timesUp,
};
export const _APIs = {
	Attendee: {
		iWillGo: Attendee_iWillGo,
	},
	Checkin: {
		theyCame: Checkin_theyCame,
		timesUp: Checkin_timesUp,
	},
};
