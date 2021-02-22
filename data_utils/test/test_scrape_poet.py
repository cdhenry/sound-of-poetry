from scripts.scrape_poet import scrape_poet


# test poet with all values present
def test_scrape_heaney():
    heaney = scrape_poet("https://www.poetryfoundation.org/poets/seamus-heaney")
    assert heaney["name"] == "Seamus Heaney"
    assert heaney["yob"] == "1939"
    assert heaney["yod"] == "2013"
    assert "http" in heaney["image"] and ".jpeg" in heaney["image"]
    assert "Region:" in heaney["attrs"].keys()
    assert "Ireland & Northern Ireland" in heaney["attrs"]["Region:"]


# test poet with no date of birth/death
def test_scrape_wang():
    wang = scrape_poet("https://www.poetryfoundation.org/poets/yun-wang")
    assert wang["name"] == "Yun Wang"
    assert wang["yob"] is None
    assert wang["yod"] is None
    assert "Region:" in wang["attrs"].keys()
    assert "Asia, East" in wang["attrs"]["Region:"]


# test poet with no 'more about' section, and no image
def test_scrape_cole():
    cole = scrape_poet("https://www.poetryfoundation.org/poets/kevin-l-cole")
    assert cole["name"] == "Kevin L. Cole"
    assert cole["yob"] is None
    assert cole["yod"] is None
    assert cole["image"] is None
    assert len(cole["attrs"].keys()) == 0
