'''
Here be our collection manipulating scripts
'''

def find_year(num,collection):
    movies = []
    for doc in collection.find({"year" : num}):
        movies.append(doc)
    return movies

'''
def find_genre(genre):
    movies = []
    for doc in collection.find({"genres" : "genres"["genres".find(genre)]}):
        ret.append(doc)
    return movie
'''

def find_movie(title, year):
    movies = []
    for doc in collection.find({"$and": [{"title" : title}, {"year" : year}]}):
        ret.append(doc)
    return movies

'''
def find_cast(person):
    movies = []
    for doc in collection.find({"cast" : "cast"["cast".find(person)]}):
        ret.append(doc)
    return movies
'''

#print(find_year(1900))
#print(find_movie("After Dark in Central Park", 1900))
#print(find_cast("Dwayne Johnson"))
#print(find_genre("action"))
