opener = poster.streaminghttp.register_openers()
opener.add_handler(urllib2.HTTPCookieProcessor(cookielib.CookieJar()))

params = {'imgFile': open("d:\\test.jpg", "rb"), 'name': 'upload test'}
datagen, headers = poster.encode.multipart_encode(params)
request = urllib2.Request('http://127.0.0.1:3001/do/gi', datagen, headers)
result = urllib2.urlopen(request)