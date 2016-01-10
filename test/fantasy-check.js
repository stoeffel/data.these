'use strict';

var mochaAdapter = require('fantasy-check/src/adapters/mocha');
var applicative = require('fantasy-check/src/laws/applicative');
var functor = require('fantasy-check/src/laws/functor');
var comonad = require('fantasy-check/src/laws/comonad');

var Theese = require('../lib/these');
var These = Theese.These;
var This = Theese.This;
var That = Theese.That;

var run = function (m) {
    return m.get();
};

var identity = function (x) {
    return x;
};

var obey = function (title, testFactory, factoryArgs, skipped) {
    var test = skipped ? it.skip : it;
    test(title, function () {
        testFactory(mochaAdapter).apply(null, factoryArgs)();
    });
};

obey.skip = function (title, testFactory, factoryArgs) {
    obey(title, testFactory, factoryArgs, true);
};

describe('Fantasy-Check', function () {
    describe('#This', function () {
        describe('Functor', function () {
            obey('All', functor.laws, [ This, run ]);
            obey('Identity', functor.identity, [ This, run ]);
            obey('Composition', functor.composition, [ This, run ]);
        });

        describe('Applicative Functor', function () {
            obey('All', applicative.laws, [ This, run ]);
            obey('Identity', applicative.identity, [ This, run ]);
            obey('Composition', applicative.composition, [ This, run ]);
            obey('Homomorphism', applicative.homomorphism, [ This, run ]);
            obey('Interchange', applicative.interchange, [ This, run ]);
        });

        describe('Comonad', function () {
            obey('All', comonad.laws, [ This, identity ]);
            obey('Identity', comonad.identity, [ This, identity ]);
            obey('Composition', comonad.composition, [ This, identity ]);
            obey('Associativity', comonad.associativity, [ This, identity ]);
        });
    });

    describe('#That', function () {
        describe('Functor', function () {
            obey('All', functor.laws, [ That, run ]);
            obey('Identity', functor.identity, [ That, run ]);
            obey('Composition', functor.composition, [ That, run ]);
        });

        describe('Applicative', function () {
            obey('All', applicative.laws, [ That, run ]);
            obey('Identity', applicative.identity, [ That, run ]);
            obey('Composition', applicative.composition, [ That, run ]);
            obey('Homomorphism', applicative.homomorphism, [ That, run ]);
            obey('Interchange', applicative.interchange, [ That, run ]);
        });

        describe('Comonad', function () {
            obey('All', comonad.laws, [ That, identity ]);
            obey('Identity', comonad.identity, [ That, identity ]);
            obey('Composition', comonad.composition, [ That, identity ]);
            obey('Associativity', comonad.associativity, [ That, identity ]);
        });
    });

    describe('#These', function () {
        describe('Functor', function () {
            obey('All', functor.laws, [ These, run ]);
            obey('Identity', functor.identity, [ These, run ]);
            obey('Composition', functor.composition, [ These, run ]);
        });

        describe('Applicative', function () {
            obey('All', applicative.laws, [ These, run ]);
            obey('Identity', applicative.identity, [ These, run ]);
            obey('Composition', applicative.composition, [ These, run ]);
            obey('Homomorphism', applicative.homomorphism, [ These, run ]);
            obey('Interchange', applicative.interchange, [ These, run ]);
        });

        describe('Comonad', function () {
            obey('All', comonad.laws, [ These, identity ]);
            obey('Identity', comonad.identity, [ These, identity ]);
            obey('Composition', comonad.composition, [ These, identity ]);
            obey('Associativity', comonad.associativity, [ These, identity ]);
        });
    });
});

