# mangoes--korozaA_songD_wangZ
#### Members: Aleksandra K, Derek S, Zane W.
#### SoftDev2 pd8
#### P #04: Viz not to be confused with vis or vis-a-vis

## Dataset

We are using the Unification Project dataset. This set includes K-12 financial, enrollment, and achievement data from all around the country. Data ranges from 1992 to 2017 and there are entries for every state. Columns include financial data (such as state and federal revenue), achievement data (such as average Math 4 scores), and enrollment statistics (number of students per grade and their demographics).

This group aims to use this dataset to explore the state of education in the U.S. We would like to compare the amount invested in education and associated resources in every state and see how/if that affects academic achievement. There are great disparities in the realm of education in our country and we wish to delve deeper in the factors at play.


We sourced this dataset from [here](https://www.kaggle.com/noriuk/us-education-datasets-unification-project)

## Display

The user will be shown a map of the United States tuned to the data from our dataset. Darker regions of the map will refelct higher amounts of the property in question (eg. funding). This will provide for a clear visualization of differences between states. The dataset allows the user to explore how state revenues affect academic achievement of the students in that state.
  
## D3 Utilization

To implement our responsive map, we referenced the [chloropleth](https://observablehq.com/@d3/choropleth) D3 gallery example. When the user hovers over a particular state, data for that state for the past 3 years becomes visible. 

The user can either choose to view the map containing financial (total revenue), enrollment (the U.S. Census Bureau's count for students in the state), or achievement data (average score for eight graders taking the NAEP math exam).


## Sketch

![image](/sketch.jpeg)

## Launch Codes!

Ready to dive in? 

1. Copy the ssh/https link and run ``` $ git clone <link> ```
2. Install virtualenv by running ```$ pip install virtualenv ```
3. Make a new venv by running ``` $ python3 -m venv ENV ```
4. Activate it by running ``` $ . /ENV/bin/activate ```
5. Install Flask and wheel with $ pip install flask and $ pip install wheel (this is a Flask application)
6. Run $ python app.py
7. Launch the root route (http://127.0.0.1:5000/) in your browser to go to the login page.


