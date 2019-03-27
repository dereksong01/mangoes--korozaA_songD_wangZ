# mangoes--korozaA_songD_wangZ
#### Members: Aleksandra K, Derek S, Zane W.
#### SoftDev2 pd8
#### P #04: Viz not to be confused with vis or vis-a-vis

## Dataset

We are using the Unification Project dataset. This set includes K-12 financial, enrollment, and achievement data from all around the country. Data ranges from 1992 to 2017 and there are entries for every state. Columns include financial data (such as state and federal revenue), achievement data (such as average Math 4 scores), and enrollment statistics (number of students per grade and their demographics).

This group aims to use this dataset to explore the state of education in the U.S. We would like to compare the amount invested in education and associated resources in every state and see how/if that affects academic achievement. There are great disparities in the realm of education in our country and we wish to delve deeper in the factors at play.


We sourced this dataset from [here](https://www.kaggle.com/noriuk/us-education-datasets-unification-project)

## Display

The user will be shown a map of the United States tuned to the data from our dataset. Darker regions of the map will refelct higher amounts of the property in question (eg. funding). This will provide for a clear visualization of differences between states. The dataset allows the user to explore how state revenues and various types of expenditures affect academic achievement of the students in that state. One would also be able to track differences in the performance and enrollment of students of varying racial backgrounds/ genders. 

<include sketch here>
  
## D3 Utilization

To implement our responsive map, we will be referencing the [chloropleth](https://observablehq.com/@d3/choropleth) D3 gallery example. When the user hovers over a particular state, data for that state will be visible. 

The appearance of the map will depend on the user's selections. Options will be visible on the screen near the map. 
User would be prompted to choose a year and an option from either the Financial, Enrollment, or Achievment fields. The possible options for each field (and some additional details) are as follows:

#### Financial

ENROLL (The U.S. Census Bureau's count for students in the state. Should be comparable to GRADES_ALL (which is the NCES's estimate for students in the state);
TOTAL REVENUE (The total amount of revenue for the state);
FEDERAL_REVENUE;
STATE_REVENUE;
LOCAL_REVENUE;
TOTAL_EXPENDITURE (The total expenditure for the state);
INSTRUCTION_EXPENDITURE;
SUPPORT_SERVICES_EXPENDITURE;
CAPITAL_OUTLAY_EXPENDITURE;
OTHER_EXPENDITURE;

#### Enrollment

GRADES_PK: Number of students in Pre-Kindergarten education;
GRADES_4: Number of students in fourth grade;
GRADES_8: Number of students in eighth grade;
GRADES_12: Number of students in twelfth grade;
GRADES_1_8: Number of students in the first through eighth grades;
GRADES 9_12: Number of students in the ninth through twelfth grades;
GRADES_KG_12: Number of students in Kindergarten through twelfth grade;
GRADES_ALL: The count of all students in the state;

Data is also divided to include some demographic information:
The represented races include AM (American Indian or Alaska Native), AS (Asian), HI (Hispanic/Latino), BL (Black or African American), WH (White), HP (Hawaiian Native/Pacific Islander), and TR (Two or More Races). The represented genders include M (Male) and F (Female).

#### Achievement

AVG_MATH_4_SCORE: The state's average score for fourth graders taking the NAEP math exam;
AVG_MATH_8_SCORE: The state's average score for eight graders taking the NAEP math exam;
AVG_READING_4_SCORE: The state's average score for fourth graders taking the NAEP reading exam;
AVG_READING_8_SCORE: The state's average score for eighth graders taking the NAEP reading exam;


