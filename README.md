Mootools-Private
================

AOP is a mutator which let you write Aspect Oriented Classes in MooTools

How to use
----------

Just include keeto.PatternMutator.js and kenta.AOP.js.
look at the Spec directory to see a couple of example.

Included in this repository there is the Profiler example I wrote about in this post on my blog:
http://mykenta.blogspot.it/2011/10/mootools-aop-and-how-to-use-aop-for.html

Disclaimer
----------
What kenta.AOP is not?
It is not a complete AOP Framework.
In particular kenta.AOP can't handle property access and it doesn't perform exception handling by design;
it also overwrites all MooTools class methods, so I advise against using it for production-code :)
