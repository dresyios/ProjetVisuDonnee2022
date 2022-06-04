import pandas as pd
import numpy as np
import math

data= pd.read_csv("CSVs/salesMerged(99).csv", usecols= ['Country','Year','Total_Sales'])

newData=[]

#Paires pays:xy pour les placer sur la carte A COMPLETER AU FIL DES DONNES
#locations={'us':[210,155], 'jp':[940,165], 'uk':[512, 110], 'fr':[526, 130], 'ca':[210, 100]}

for year in range(1980,2000):
    countries=[]
    print("Year: ", year)
    for index, row in data.iterrows():
        if (data.loc[index, 'Country'] not in countries) and (data.loc[index, 'Year']==year):
            countries.append(data.loc[index, 'Country'])

    print("Pays ", year, " :", countries)
    
    currentArray=[]
    for index, x in enumerate(countries):
        print("Index: ",index)
        print("Country: ",x)
        currentArray.append([year, x, round(data.loc[(data['Year'] == year) & (data['Country'] == x), 'Total_Sales'].sum(),2)])

    newData.append(currentArray)

print('Array :', newData)

flat_newData = []
for item in newData:
    for subitem in item:
        flat_newData.append(subitem)

print("flat: ", flat_newData)

dataNP = np.array(flat_newData)
print("dataNP: ", dataNP)

df = pd.DataFrame(dataNP, columns=['Year','Country','Sales'])
df.to_csv('dataset.csv', index=False)
