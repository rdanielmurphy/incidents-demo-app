Background
==========
Enrich 911 emergency incident data to provide better analytics for a fire department.

Task
----
Given an incident data, enrich it and then display the location and data on a map for easy validation.

Enrichments
-----------
* Weather at the time of the incident (use a weather service of your choice, but https://darksky.net/ does include free historical queries).
* Parcel data at the location of the incident. Note that a Parcel is a polygon with attributes such as: ```OwnerName, MailAddress, LandValue, LandSqFt, ...```. Use this existing service which belongs to the city of Richmond, VA: http://gis.richmondgov.com/ArcGIS/rest/services/StatePlane4502/Ener/MapServer/0/

Note that the "Query" link at the bottom of the page allow you to search for parcels. The Query page has a link to an API Reference documentation link which you should use for help.  The incident has a point as "longitude" and "latitude" properties (which corresponds to `"spatialReference" : {"wkid" : 4326}`).  
*  Optional: If you have extra time or want to go the extra mile, are there additional attributes that would be helpful for the department to know?

Notes
-----
* Example incidents are provided in the data folder.
* We will test the project with an arbitrary incident file that is also from Richmond, VA and in the same format.
* It would be sufficient for the app to only handle one CAD file at a time.
* The incident location and attributes should be displayed on a map in the browser.
* You can enrich the incident and get it on a map however you wish.
* We would like for you to spend up to 4 hours. It is okay if you spend less time or more time so long as you have a working app.
* Use technology stack of your choice.

Deliverable
-----------
* Link to a Github repository with your commits as you originally made them. Do not squash them or just have a single commit. 
* There should be a README in the repo with:
    * steps to install and run your app
    * did you complete the project? comment as needed.
    * how much time did you spend on the project?
    * Add a couple of screen shots to the repo that show the working version as running on your machine. 
* Assume the user will be on OSX but if you do not have access to OSX machine, provide needed steps to run your app on any other OS.
