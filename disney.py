import csv

# flatTimes.insert(0, ['id', 'name', 'waittime', 'status', 'active', 'lastupdate', 'gameid', 'tookedtime'])
def zeroWaitTime(game):
    for time in game:
        try:
            if int(time[2]) != 0:
                return False
        except:
            return True
    return True

def fillEmptyValues(game):
    ant = 0
    for time in game:
        waitTime = int(time[2])
        if(waitTime == 0):
            time[2] = ant
        else:
            ant = waitTime
    return game

def readCSVTimes():
    times = {}
    with open('csv/disney.csv') as csvfile:
        readCSV = csv.reader(csvfile, delimiter=',')
        for row in readCSV:
            name = row[1]
            if name not in times.keys():
                times[name] = []
            times[name].append(row)
    return times

def writeCSVTimes(times, name):
    with open('csv/' +name + '.csv','w') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(flatTimes)

# indexes have to be ordered from lower to upper
def deleteIndexes(times, indexes):
    for time in times:
        for index in reversed(indexes):
            del time[index]


times = readCSVTimes()
times = filter(lambda game: not zeroWaitTime(game), times.values())
timesComplete = map(fillEmptyValues, times)
flatTimes = [item for game in timesComplete for item in game]
flatTimes.insert(0, ['id', 'name', 'waittime', 'lastupdate', 'gameid', 'tookedtime'])
deleteIndexes(flatTimes, [3, 4])
writeCSVTimes(flatTimes, 'disneySinCaidas')
