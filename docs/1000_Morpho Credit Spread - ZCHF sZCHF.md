# **Morpho ZCHF/sZCHF Market Research**

## **Introduction**

This research aims to develop a credit spread strategy, focusing on borrowing at a lower rate and saving at a higher rate. The goal is to maximize returns while minimizing costs.

## **Assumptions**

The following assumptions are made:

-   `income = (L + E) * s / E`: Income is calculated as the total assets (Loan + Equity) multiplied by the savings rate (`s`) divided by the equity.
-   `cost = L * d / E`: Cost is calculated as the loan amount (`L`) multiplied by the debt rate (`d`) divided by the equity.
-   `roi = yield = income - cost`: Return on Investment (ROI) and Yield are equivalent to income minus cost.
-   `a = ltv = L / (E + L)`: Loan-to-Value ratio (`a`) is equal to the loan amount (`L`) divided by the sum of equity and loan.

## **Mathematical Model**

### Finding a Solution

To find an expression for `E` in terms of `L`, `a`, and other variables, we start with:

`E = L * ( 1 - a ) / a`

This can be simplified to:

`E = L / a - L`

Next, we seek an expression for the yield (`y`) in terms of `s`, `d`, `a`. We have:

`y = s / ( 1 - a ) - d * a / ( 1 - a )`

Simplifying this expression, we get:

`y = (s - d * a) / (1 - a)`

### Solution

The final expression for yield is:

`y = (s - d * a) / (1 - a)`

**Assuming Constants**

We assume that `s` and `a` are constants or unlikely to change quickly. This allows us to treat them as fixed values in our model.

## **Function Description**

Given the debt rate (`d`) as an input, we can calculate the yield (`y`) using the function:

`y(d) = (s - d * a) / (1 - a)`

This function captures the relationship between debt rate and yield for a given set of parameters.

## **Conclusion**

In this research, we developed a mathematical model to describe the Morpho ZCHF/sZCHF Market. We derived an expression for yield in terms of savings rate, debt rate, and loan-to-value ratio. The resulting function allows us to calculate yield given the input values of these parameters.

## **Future Research Directions**

-   Investigate the impact of market fluctuations on the model's parameters.
-   Explore alternative optimization techniques to maximize returns while minimizing costs.
-   Develop a more sophisticated model incorporating additional factors, such as credit risk and interest rates.
