import pandas as pd
import numpy as np
import math

data= pd.read_csv("CSVs/salesMerged(99).csv", usecols= ['Name','Country','Year','Publisher','Total_Sales'], keep_default_na=False)

newData=[]
newDataGames=[]

for year in range(1980,2000):
    #Créer dictionnaire éditeurs:pays
    publishers={}
    for index, row in data.iterrows():
        if (data.loc[index, 'Publisher'] not in publishers.keys() and (data.loc[index, 'Year']==year) and data.loc[index, 'Country']!=''):
            publishers[data.loc[index, 'Publisher']]=(data.loc[index, 'Country'])

    #print("Publishers ", year, " :", publishers)

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

    #Enlever une dimension des éditeurs
    flatNewArraySorted = []
    for item in newArraySorted:
        for subitem in item:
            flatNewArraySorted.append(subitem)

    #Pour chaque éditeur, parcourir les lignes de la base de données pour créer un array contenent une ligne par jeux faisant partie du top 3 d'un éditeur
    yearGamesArray = []
    for publisher in flatNewArraySorted:
        yearGamesPublisherArray=[]
        i=0
        for index, row in data.iterrows():
            if ((data.loc[index, 'Year']==year) and (data.loc[index, 'Publisher']==publisher[1]) and i<3):
                yearGamesPublisherArray.append([year, data.loc[index, 'Name'], publisher[1], publisher[2], round(data.loc[index, 'Total_Sales'],2)])
                i+=1
        #print("Year game publisher array: ", yearGamesPublisherArray)
        
        yearGamesArray.append(yearGamesPublisherArray)
        
    #Réduire une dimension de year games array
    flat_yearGamesArray = []
    for item in yearGamesArray:
        for subitem in item:
            flat_yearGamesArray.append(subitem)
    newDataGames.append(flat_yearGamesArray)
    newData.append(flatNewArraySorted)

#Réduire dimension de games data
print("New data games:", newDataGames)
flat_newDataGames = []
for item in newDataGames:
    for subitem in item:
        flat_newDataGames.append(subitem)
print("New data games flat:", flat_newDataGames)

#Réduire dimension de publisher data
flat_newData = []
for item in newData:
    for subitem in item:
        flat_newData.append(subitem)

dataNP = np.array(flat_newData)
dataGamesNP = np.array(flat_newDataGames)

df = pd.DataFrame(dataNP, columns=['Year','Publisher','Country','Sales'])
df.to_csv('dataset2.csv', index=False)

dfGames = pd.DataFrame(dataGamesNP, columns=['Year','Names', 'Publisher','Country','Sales'])
dfGames.to_csv('dataset3.csv', index=False)
