# API DOCUMENTATION

## ALL USER PROJECTS
--------------------
`GET` ➡ /api/v1/users/{userId}/projects
#### Description
```
This EP presents the projects associated to a user
```

## SPECIFIC PROJECT
-------------------
`GET` ➡ /api/v1/users/{userId}/projects/{projectId}
#### Description
```
This EP shows a specific project for the specific user
```

## TIME CODING FOR A SPECIFIC PROJECT
-------------------------------------
`GET` ➡ /api/v1/users/{userId}/projects/{projectId}/time_coding
#### Description
```
This EP shows the time spended in a specific project
```

## LANGUAGES IMPLEMENTED IN A SPECIFIC PROJECT
----------------------------------------------
`GET` ➡ /api/v1/users/{userId}/projects/{projectId}/languages
#### Description
```
This EP gives statistics about the languages that the user has used in the project
```

## OS USED
----------
`GET` ➡ /api/v1/users/{userId}/projects/{projectId}/time_coding
#### Description
```
This EP shows what OS has used the user in the current project
```

## TIME CODING FOR A SPECIFIC USER
----------------------------------
`GET` ➡ /api/v1/users/{userId}/time_coding
#### Description
```
This EP shows the time that a user has spended in total
```

## LANGUAGES FOR A SPECIFIC USER
--------------------------------
`GET` ➡ /api/v1/users/{userId}/languages
#### Description
```
This EP presents the languages that a user has used in his/her project
```

## STATISTICS
-------------
`GET` ➡ /api/v1/users/{userId}/statistics
#### Description
```
This is an overview of all the statistics
```

## OS STATISTICS
----------------
`GET` ➡ /api/v1/users/{userId}/statistics/os
#### Description
```
what OS has been used by the user to implement the projects
```

## LEADERBOARD
--------------
`GET` ➡ /api/v1/leaderboard
#### Description
```
A general view of all users
```

## LANGUAGES MORE USED
----------------------
`GET` ➡ /api/v1/languages/{languageId}
#### Description
```
the languages more used in the community
```

## LEADERBOARD BY LANGUAGES
---------------------------
`GET` ➡ /api/v1/languages/{languageId}/leaderboard
#### Description
```
the leaders in the elected language
```
