import re
import requests

from bs4 import BeautifulSoup as bs


def scrape_poet(url):
    poet = {"pf_url": url}

    # get html for poet's page and make soup :)
    print(f"requesting {url}")
    html = requests.get(url)
    print(html.status_code)
    page_soup = bs(html.content, "html.parser")

    # extract innerHtml and add to return object
    article = page_soup.find("article")
    # name
    poet["name"] = article.find("h1", class_="c-hdgSerif").text
    # years of birth/death (if present)
    if article.find("span", class_="c-txt_poetMeta"):
        meta_text = article.find("span", class_="c-txt_poetMeta").text
        year_groups = re.findall("[0-9]+", meta_text)
        if len(year_groups) > 0:
            poet["yob"] = year_groups[0]
        else:
            poet["yob"] = None
        if len(year_groups) > 1:
            poet["yod"] = year_groups[1]
        else:
            poet["yod"] = None
    else:
        poet["yob"] = None
        poet["yod"] = None
    # image of poet
    if article.find("img"):
        poet["image"] = article.find("img")["srcset"].split("?")[0]
    else:
        poet["image"] = None

    # biography/main text (if present)
    if article.find("div", class_="c-userContent"):
        poet["bio"] = article.find("div", class_="c-userContent").text
    else:
        poet["bio"] = None

    # 'more about this poet' section
    poet_attrs = {}
    if article.find("div", class_="o-taxonomyItem"):
        poet_more = article.find_all("div", class_="o-taxonomyItem")
        for div in poet_more:
            attr_key = div.find("span").text
            attr_values = []
            values = div.find_all("li")
            for val in values:
                attr_values.append(val.find("a").text)
            poet_attrs[attr_key] = attr_values
    poet["attrs"] = poet_attrs

    return poet


if __name__ == "__main__":
    print(scrape_poet("https://www.poetryfoundation.org/poets/hanif-abdurraqib"))
