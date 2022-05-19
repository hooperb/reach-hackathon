'reach 0.1';
'use strict';

export const main = Reach.App(() => {
    const D = Participant('Admin', {
        price: UInt,
        deadline: UInt,
        ready: Fun([], Null),
    });
    const A = API('Attendee', {
        iWillGo: Fun([], Bool),
        makeMove: Fun([UInt, UInt], Bool)
    });
    const C = API('Checkin', {
        theyCame: Fun([Address], Bool),
        timesUp: Fun([], Bool),
    });
    init();

    D.only(() => {
        const price = declassify(interact.price);
        const deadline = declassify(interact.deadline);
        check(price < 100000000);
    });
    D.publish(price, deadline);
    D.interact.ready();
    check(price < 100000000);

    const RSVPs = new Map(Object({
        came: Bool,
    }));

    // const RBoard = [];
    // const YBoard = array(UInt, []);
    // const Board = array(UInt, []);
    // const Move = Tuple(UInt, UInt);
    // const RBoard = new Map(UInt);
    const YBoard = new Map(UInt);

    const [ keepGoing, howMany ] =
        parallelReduce([true, 0])
        .define(() => {
          const contains = (arrInput, current) => arrInput.forEach((item) => check(item != current));
        })
        .invariant(
            true
            && balance() == howMany * price
            && RSVPs.size() == howMany
        )
        .while( keepGoing )
        .api(A.iWillGo,
            () => {
                check(isNone(RSVPs[this]), "they haven't rsvpd");
            },
            () => price, // transfer amount
            (k) => {
                check(isNone(RSVPs[this]), "they haven't rsvpd");
                RSVPs[this] = { came: false };
                k(true);
                return [ keepGoing, howMany + 1 ];
            }
        )
        .api(A.makeMove,
          (x, y) => {
            check((x < 7) && (x >= 0), "x is good");
            check((y < 7) && (x >= 0), "y is good");
            // const move = [x, y];
            const unique = (x + y) * (x + y + 1) / 2 + x;
            // const yBoard = Array.replicate(24, YBoard);
            check(YBoard[this].contains([unique]) != "Y");
            // contains(yBoard, unique);
          },
          (_, _) => 0,
          (x, y, k) => {
            check((x < 7) && (x >= 0), "x is good");
            check((y < 7) && (x >= 0), "y is good");
            k(true);
            return [ keepGoing, howMany ];
          }
        )
        .api(C.theyCame,
            (who) => {
                check(isSome(RSVPs[who]), "they rsvpd");
                check(this == D, "you are the boss");
            },
            (_) => 0,
            (who, k) => {
                check(isSome(RSVPs[who]), "they rsvpd");
                check(this == D, "you are the boss");
                transfer(price).to(who);
                delete RSVPs[who];
                k(true);
                return [ keepGoing, howMany - 1 ];
            }
        )
        .timeout( absoluteTime(deadline), () => {
            const [ [], k ] = call(C.timesUp);
            k(true);
            return [ false, howMany ]
        });
    const leftovers = howMany;

    transfer(leftovers * price).to(D);
    commit();

    exit();
});