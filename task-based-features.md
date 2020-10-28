Summary of task-based features:

1. Task 1:

    As this is the first task, and the general structure has not been established, we will specify a number of basic features.

    - 'buckets' shall represent an amount of money per period of time
      - buckets shall have a label, and an 'input' and an 'output' list
        - inputs and outputs shall have labels and dollar values
        - the value of a bucket shall be the net value of all its inputs and outputs
        - a bucket may take another bucket as an input or output, using its net value.
    - a bucket will somehow be visually represented, with connections to other buckets also being represented
        - these representations, if feasible, will maintain some aspect of visual metaphor in keeping with the bucket metaphor

    This general definition of the bucket methapor for this system accomplishes 2 things:

    - Firstly, it establishes a system by which a user's income and expenses/expenditures may be tracked both thouroughly and hierarchically.
    - Secondly, it establishes a metaphor by which this tracking may be easily understood and manipulated to suit a user's needs.

2. Task 2:

    This task mostly benefits from the already established system of the previous task, with buckets acting as categories with outputs for expenses. That said, it implies another feature:

    - buckets require a second value, with an additional visual indicator, which shall represent the sum input only. This allows the user to both see the amount of money assigned for the given category, and the amount of money remaining after outputs have been assigned.

3. Task 3:

    This task introduces the idea of minimum and maximum inputs. As such a new feature is in order:

    - All inputs and outputs may optionally be assigned a minimum and maximum value.
        - All buckets may now indicate a minimum and maximum value for their net and sum input value indicators.
        - Minimum and maximum values propogate when a bucket is used as an input or output to another bucket
        - The value of an input/output/bucket should be able to be set to a value between (inclusive) its minimum and maximum values easily, as a means of 'freezing' the value.
    - This way a user may project their expected income, and then later set the income when it becomes known.

    This feature allows the user to see the minimum and maximum values in any category, meaning that they can find a safe minimum of money that may be allocated to a given category in reality, as in the task example.
    
    Additionally, we will add the concept of 'super-buckets' which will be the main bucket shown on a given screen, to which all outputs are sub-buckets. This will allow users to keep a set of profiles in which they can manage vastly different categories, such as keeping investments separate from income.


Addendum: It's worth noting that no feature has been defined for keeping a record of expenditures nor bucket values. This is intentional; the purpose of this program is less for detailed expense logging, a task which our target users do not intend to use, and more for time-period regular expense and personal spending allowance tracking. The metaphor upon which the program is built focuses about setting buckets, or allowances, for particular purposes, allowing a user to see how much they may spend in a given time period, rather than tracking precisely how much they have spent on each purchase.
