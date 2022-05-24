import pandas as pd
import numpy as np
import math

data= pd.read_csv("CSVs/salesMerged(96).csv", usecols= ['Country','Year','Publisher','Total_Sales'])

newData=[]

for year in range(1980,1982):
    publishers={}
    for index, row in data.iterrows():
        if (data.loc[index, 'Publisher'] not in publishers.keys() and (data.loc[index, 'Year']==year)):
            publishers[data.loc[index, 'Publisher']]=(data.loc[index, 'Country'])

    print("Publishers ", year, " :", publishers)


    currentArray=[]
    for key in publishers:
        currentArray.append([year, key, publishers[key], round(data.loc[(data['Year'] == year) & (data['Country'] == publishers[key]) & (data['Publisher']== key), 'Total_Sales'].sum(),2)])
    print("Current array: ", currentArray)
    
    #TRIER CURRENT ARRAY
    swapped = True
    while swapped:
        swapped = False
        for i in range(len(currentArray) - 1):
            if currentArray[i][3] < currentArray[i + 1][3]:
                # Swap the elements
                currentArray[i+1], currentArray[i] = currentArray[i], currentArray[i+1]
                # Set the flag to True so we'll loop again
                swapped = True
    
    #DIC DE PAYS
    d = {}
    for sub in currentArray:
        key = sub[2]
        if key not in d: d[key] = []
        d[key].append(sub)

    newArraySorted=[]

    for pays in d.keys():
        print("D[pays]: ", d[pays])
        if len(d[pays])>5:
            sommePlus5=0
            for entree in d[pays][5:]:
                sommePlus5+=entree[3]
            d[pays][5:]=[year, pays, "Autres", sommePlus5]
        newArraySorted.append(d[pays])
    
    print("Pays sorted et cut: ", d)
    print("New array sorted: ", newArraySorted)


    newData.append(newArraySorted)

print('Array :', newData)

flat_newData = []
for item in newData:
    for subitem in item:
        flat_newData.append(subitem)

print("Flat array: ", flat_newData)


flat_newData2 = []
for item in flat_newData:
    for subitem in item:
        flat_newData2.append(subitem)

print("Flat array2: ", flat_newData2)

#dataNP = np.array(flat_newData)
#print("dataNP: ", dataNP)

#df = pd.DataFrame(dataNP, columns=['Year','Publisher','Country','Sales'])
#df.to_csv('dataset2.csv', index=False)
