# **Cities-States-Country**

Get all Cities, State, Country all over the world.
<br/><br/>
## **Steps for Installation**
<br />
Install the package with

      npm i city-state-country --save
      
**Usage**

      var worldMapData = require('city-state-country');

<br />

# **Supported Methods**
<br />

## **Countries Methods**

<br />

 **Get list of all Countries**
      
     const countriesList = worldMapData.getAllCountries();

 **Search Country**

The search text field is case insensitive.
      
     const countriesList = worldMapData.searchCountry('indi');

 **Search Country by CountryCode (ISO2)**

Only ISO2 Country code value is supported.
      
     const countriesList = worldMapData.searchCountryByCountryCode('IN');

<br/>

## **State Methods**

<br/>

**Get list of all States by a Country Name**

The search text field is case insensitive.
      
     const statesList = worldMapData.getAllStatesFromCountry('India');

**Get list of all States by Country Id**

Use Country Id from country data.
      
     const statesList = worldMapData.getStatesByCountryId('101');

**Search State details**

This method will return all states from world which starts with 'maha'. The search text field is case insensitive.
      
     const statesList = worldMapData.searchState('maha');
     
<br/>

### **City Methods**

<br/>

**Get list of all Cities by State Name**

The search text field is case sensitive.

     const citiesList = worldMapData.getAllCitiesFromState('Maharashtra');

**Get list of all Cities by State Id**

Use State Id from state data.

     const citiesList = worldMapData.getAllCitiesByStateId('4008');

**Search City details**

This method will return all cities from world which starts with 'parbh'.
      
     const citiesList = worldMapData.searchCity('parbh');

<br/>

## **Submit Issues**

Email me regarding any issue me at swapnil.nakhate1010@gmail.com

<br/>

## **Note**
Database used for this plugin is updated.
This database is taken from : https://github.com/dr5hn/countries-states-cities-database.<br/>
<br/>

## **License**

This **Countries States Cities Database** is made available under the [Open Database License](https://github.com/dr5hn/countries-states-cities-database/blob/master/LICENSE). Any rights in individual contents of the database are licensed under the [Database Contents License](https://github.com/dr5hn/countries-states-cities-database/blob/master/.github/CONTENT_LICENSE).
