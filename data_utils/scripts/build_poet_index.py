import requests

from bs4 import BeautifulSoup as bs


_BASE_URL = "https://www.poetryfoundation.org/poets/browse"


def build_poet_index():
    with open("poet_urls.txt", "w") as f:
        for page in range(1, 234):
            response = requests.get(
                _BASE_URL,
                headers="",
                params={"page": page, "sort_by": "last_name", "preview": "0"},
            )
            if response.status_code == 200:
                page_soup = bs(response.content, "html.parser")
                for poet in page_soup.find_all("h2", class_="c-hdgSans"):
                    print(poet)
                    poet_url = poet.find("a")["href"]
                    print(f"writing: {poet_url}")
                    f.write(f"{poet_url}\n")
                page = page + 1
            else:
                break


if __name__ == "__main__":
    build_poet_index()
