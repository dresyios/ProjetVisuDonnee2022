import pandas as pd
import numpy as np
import math

data= pd.read_csv("CSVs/salesMerged(96).csv", usecols= ['Country','Year','Publisher','Total_Sales'])

newData=[]

for year in range(1980,1982):
    publishers={}
    for index, row in data.iterrows():
        if (data.loc[index, 'Publisher'] not in publishers.keys() and (data.loc[index, 'Year']==year)):
            #print("Publisher: ", data.loc[index, 'Publisher'])
            #print("Country: ",data.loc[index, 'Country'])
            publishers[data.loc[index, 'Publisher']]=(data.loc[index, 'Country'])

    print("Publishers ", year, " :", publishers)


    currentArray=[]
    for key in publishers:
        #print("Publisher: ",key)
        #print("Country: ",publishers[key])
        currentArray.append([year, key, publishers[key], round(data.loc[(data['Year'] == year) & (data['Country'] == publishers[key]) & (data['Publisher']== key), 'Total_Sales'].sum(),2)])
    print("Current array: ", currentArray)
    
    #TRIER CURRENT ARRAY LA
    


    newData.append(currentArray)

print('Array :', newData)

flat_newData = []
for item in newData:
    for subitem in item:
        flat_newData.append(subitem)

print("Flat array: ", flat_newData)

dataNP = np.array(flat_newData)
print("dataNP: ", dataNP)

df = pd.DataFrame(dataNP, columns=['Year','Publisher','Country','Sales'])
df.to_csv('dataset2.csv', index=False)
