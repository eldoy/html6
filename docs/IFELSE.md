So here's the algorithm:

1. In dispatch, when I see if else or elsif, then I enter conditional and check if the nextElement is an elsif or else

2. If nextElement is an else or elsif then I just leave and do nothing

3. If nextElement is not else or elsif then I go back up the chain using previousElement until I find an if, and process like now. At this point all the siblings have been processed.
