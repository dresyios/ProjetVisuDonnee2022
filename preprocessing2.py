import pandas as pd
import numpy as np
import math

data= pd.read_csv("CSVs/salesMerged(96).csv", usecols= ['Country','Year','Publisher','Total_Sales'], keep_default_na=False)

newData=[]

for year in range(1980,1997):
    #Créer dictionnaire éditeurs:pays
    publishers={}
    for index, row in data.iterrows():
        if (data.loc[index, 'Publisher'] not in publishers.keys() and (data.loc[index, 'Year']==year) and data.loc[index, 'Country']!=''):
            publishers[data.loc[index, 'Publisher']]=(data.loc[index, 'Country'])

    print("Publishers ", year, " :", publishers)

    #Créer une liste par année contenenant des listes pour chaque éditeur et pays
    currentArray=[]
    for key in publishers:
        currentArray.append([year, key, publishers[key], round(data.loc[(data['Year'] == year) & (data['Country'] == publishers[key]) & (data['Publisher']== key), 'Total_Sales'].sum(),2)])
    
    #En ordre décroissant
    swapped = True
    while swapped:
        swapped = False
        for i in range(len(currentArray) - 1):
            if currentArray[i][3] < currentArray[i + 1][3]:
                # Swap the elements
                currentArray[i+1], currentArray[i] = currentArray[i], currentArray[i+1]
                # Set the flag to True so we'll loop again
                swapped = True
    
    #Créer dictionnaire de pays auxquels correspondent une liste d'éditeurs pour pouvoir cut et créer ligne autres
    d = {}
    for sub in currentArray:
        key = sub[2]
        if key not in d: d[key] = []
        d[key].append(sub)

    newArraySorted=[]

    for pays in d.keys():
        if len(d[pays])>5:
            sommePlus5=0
            for entree in d[pays][5:]:
                sommePlus5+=entree[3]
            del d[pays][5:]
            d[pays].append([year, "Autres", pays, sommePlus5])
        newArraySorted.append(d[pays])
    
    print("New array sorted: ", newArraySorted)

    newData.append(newArraySorted)

flat_newData = []
for item in newData:
    for subitem in item:
        flat_newData.append(subitem)

flat_newData2 = []
for item in flat_newData:
    for subitem in item:
        flat_newData2.append(subitem)

dataNP = np.array(flat_newData2)

df = pd.DataFrame(dataNP, columns=['Year','Publisher','Country','Sales'])
df.to_csv('dataset2.csv', index=False)
