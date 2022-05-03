import pandas as pd

data= pd.read_csv("CSVs/vgsales.csv", usecols= ['Rank','Name','Year','Platform','Publisher','Global_Sales'])

print(data.columns)

data = data[data.Platform != 'GB']
data = data[data.Platform != 'DS']
data = data[data.Platform != 'GBA']
data = data[data.Platform != '3DS']
data = data[data.Platform != 'PSP']
data = data[data.Platform != 'PSV']
data = data[data.Platform != 'PC']


data['Total_Sales'] = data.groupby(['Name'])['Global_Sales'].transform('sum')
data = data.drop_duplicates(subset=['Name'])

data = data.fillna(0)
data[['Year']] = data[['Year']].astype(int)

for x in range(1980, 2017):
    data_year = data.loc[data['Year'] == x]
    filename="CSVs/"+str(x)+".csv"
    data_year.to_csv(filename)


data.to_csv('CSVs/vgsalesfilterd.csv', index=False)
