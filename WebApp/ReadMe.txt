========================
BUILD OUTPUT DESCRIPTION
========================

A friendly and easy to use framework based on 
C# 4.5 MVC Razor 4 SOLID principles with a fluid configuration interface 
which wires up some commonly used components mainly in getting CvsFile as My Database.

I choose third party tools i.e CvsHelper to read csv File more over 
the pluggin can used to do all CRUD operations. Due to time factor l used
for reading data from a csv file.

Rhino mock was also used when mocking the database access and NUnit 
mocking to handle exception.

The Exception are going to saved in log file specified in NLog.cofile file (third party tool).
Depending on the type of error or hierach the application also send error
when critical errors are caught.

The application was build on 3 tier.
Though not the best approach that l choose
due probably, l would have an API for flexibity and 
security feature that would require time.
 
#####Quick Setup Getting the framework up and running is super easy. 
Assuming that you have the following in installed on your matching:

Visual Studio 2015





========================
ASSUMPTION
========================
Assuming the file is on the path specified (Config File) App.config.

========================
OUTPUT RESULTS
========================

Go to application domain find a folder call ActivityLog
inside ActivityLog there are two text files.
