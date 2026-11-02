// Converted from the local WordPress reference; preserve SVG coordinates and data attributes.
import type { CSSProperties } from "react";

export function DataCenterContent() {
  return (
<main id={"main"} className={"page-wrap wrap tt-dc-page"} tabIndex={-1}>
{"\n"}
<article className={"tt-dc-article post-97 post type-post status-publish format-standard hentry category-data-stories"} data-dc-story={true}>
{"\n  "}
<header className={"tt-dc-header"}>
{"\n    "}
<p className={"eyebrow"}>
{"26 October 2026 / DATA STORY"}
</p>
{"\n    "}
<h1>
{"What gives a data center away"}
</h1>
{"\n    "}
<p className={"tt-dc-deck"}>
{"I looked at 38 big projects to see which public records gave away a data center before anyone called it one. Code names were less useful than I expected. The people in the filings and the permanent jobs promised for the investment told me more."}
</p>
{"\n    "}
<div className={"tt-dc-header-meta"}>
<span>
{"38 projects"}
</span>
<span>
{"8 signals"}
</span>
<span>
{"5 findings"}
</span>
<span>
{"Scored 21 October 2026"}
</span>
</div>
{"\n    "}
<p className={"tt-dc-context"}>
{"This is a small, selected set of projects. The charts can help you decide what to check next; they cannot confirm what an undisclosed site will become."}
</p>
{"\n  "}
</header>
{"\n  "}
<nav className={"tt-dc-chapters"} aria-label={"Article chapters"}>
{"\n    "}
<a href={"#finding-1"}>
{"01 Signals"}
</a>
<a href={"#finding-2"}>
{"02 Test"}
</a>
<a href={"#finding-3"}>
{"03 Lead time"}
</a>
<a href={"#finding-4"}>
{"04 Network"}
</a>
<a href={"#finding-5"}>
{"05 Map"}
</a>
<a href={"#finding-6"}>
{"06 The routine"}
</a>
{"\n  "}
</nav>
{"\n  "}
<div className={"entry-content tt-dc-entry"}>
{"\n"}
<div className={"tt-dc-content"}>
{"\n"}
<section className={"finding"} id={"finding-1"}>
{"\n  "}
<div className={"measure"}>
{"\n    "}
<div className={"num"}>
{"01 / THE SIGNALS"}
</div>
{"\n    "}
<h2>
{"Start with the people, not the code name."}
</h2>
{"\n    "}
<p className={"lede"}>
{"I started by looking for secrecy: code names, NDAs and long tax abatements. That sounded reasonable until I checked the other big projects. Intel, Panasonic, Samsung, Scout and Foxconn used some of the same tactics. The more useful questions were who was behind the land deal and how many permanent jobs the project promised for the money going in. In this group of 38 projects, those two signals separated data centers from the other projects much better than the code names did."}
</p>
{"\n  "}
</div>
{"\n  "}
<figure id={"f1"}>
{"\n    "}
<div className={"ftitle"}>
{"How well each signal separates data centers from everything else"}
</div>
{"\n    "}
<div className={"fsub"}>
{"Area under the curve across 38 projects. 1.0 is perfect; 0.5 is a coin flip; below 0.5 the signal points the wrong way."}
</div>
{"\n    "}
<div id={"c1"} className={"tt-dc-chart"} aria-label={"Interactive chart 1"}>
<p className={"tt-dc-chart-placeholder"}>
{"The interactive chart needs JavaScript. The data table follows."}
</p>
</div>
{"\n    "}
<div className={"fnote"}>
{"Each signal scored 0–2 on evidence public before the end use was disclosed. Pooled panel: 22 data centers, 16 large non-data-center projects. AUC = probability a random data center outscores a random control."}
</div>
{"\n  "}
<details className={"tbl"}>
<summary>
{"Show signal data as a table"}
</summary>
<div className={"scroll"}>
<table>
<thead>
<tr>
<th scope={"col"}>
{"Signal"}
</th>
<th scope={"col"}>
{"AUC"}
</th>
<th scope={"col"}>
{"What it measures"}
</th>
</tr>
</thead>
<tbody>
<tr>
<td>
{"Who's in the room (S6)"}
</td>
<td>
{"0.955"}
</td>
<td>
{"A known data-center developer, engineer or counsel behind the LLC"}
</td>
</tr>
<tr>
<td>
{"Jobs per dollar (S8)"}
</td>
<td>
{"0.938"}
</td>
<td>
{"Under 5 permanent jobs per $100M of capex"}
</td>
</tr>
<tr>
<td>
{"Power filings (S1)"}
</td>
<td>
{"0.679"}
</td>
<td>
{"Load-side utility, RTO or generator air-permit filings"}
</td>
</tr>
<tr>
<td>
{"Land assembly (S2)"}
</td>
<td>
{"0.624"}
</td>
<td>
{"100+ contiguous acres by a new LLC"}
</td>
</tr>
<tr>
<td>
{"Timing (S7)"}
</td>
<td>
{"0.592"}
</td>
<td>
{"Grading before disclosure; expedited review"}
</td>
</tr>
<tr>
<td>
{"Site specs (S4)"}
</td>
<td>
{"0.554"}
</td>
<td>
{"Water, parking, docks, fiber"}
</td>
</tr>
<tr>
<td>
{"Code name (S3)"}
</td>
<td>
{"0.445"}
</td>
<td>
{"Project X, NDAs in minutes"}
</td>
</tr>
<tr>
<td>
{"Capex-sized incentives (S5)"}
</td>
<td>
{"0.409"}
</td>
<td>
{"Equipment exemptions, 30-year abatements, IRBs"}
</td>
</tr>
</tbody>
</table>
</div>
</details>
{"\n"}
</figure>
{"\n"}
</section>
{"\n\n"}
<section className={"finding"} id={"finding-2"}>
{"\n  "}
<div className={"measure"}>
{"\n    "}
<div className={"num"}>
{"02 / THE TEST"}
</div>
{"\n    "}
<h2>
{"The first rule missed almost everything."}
</h2>
{"\n    "}
<p className={"lede"}>
{"My first pass added up seven signals, most of them related to secrecy. I set the rule before checking 15 more cases. It found only one of the nine data centers in that second group. I tried adding jobs per dollar and putting more weight on the companies in the filings. That helped. A simpler check did better in this sample: look for at least 100 acres and a known data-center company somewhere in the paperwork. I would not treat that result as a proven detection rate. Thirty-eight selected projects are too few for that."}
</p>
{"\n  "}
</div>
{"\n  "}
<figure id={"f2"}>
{"\n    "}
<div className={"ftitle"}>
{"Same 38 projects, two scoring rules"}
</div>
{"\n    "}
<div className={"fsub"}>
{"Each dot is a project. Above the dashed line, the rule calls it a data center. Hollow dark rings mark the mistakes."}
</div>
{"\n    "}
<div id={"c2"} className={"tt-dc-chart"} aria-label={"Interactive chart 2"}>
<p className={"tt-dc-chart-placeholder"}>
{"The interactive chart needs JavaScript. The data table follows."}
</p>
</div>
{"\n    "}
<div className={"keyrow"}>
<span>
<i className={"sw acc"}>

</i>
{"Data center"}
</span>
<span>
<i className={"sw dim"}>

</i>
{"Not a data center"}
</span>
<span>
<i className={"sw alarm"}>

</i>
{"Wrong call"}
</span>
</div>
{"\n    "}
<div className={"fnote"}>
{"Pre-specified rule: S1–S7 summed, flag at ≥10. Discriminated rule: adds 2×jobs-ratio + party, −3 if job-heavy, flag at ≥12. Hover or focus any dot for the project. Open the table for all cases."}
</div>
{"\n  "}
<details className={"tbl"}>
<summary>
{"Show all 38 projects as a table"}
</summary>
<div className={"scroll"}>
<table>
<thead>
<tr>
<th scope={"col"}>
{"Project"}
</th>
<th scope={"col"}>
{"Place"}
</th>
<th scope={"col"}>
{"Actual"}
</th>
<th scope={"col"}>
{"First rule"}
</th>
<th scope={"col"}>
{"Revised rule"}
</th>
</tr>
</thead>
<tbody>
<tr>
<td>
{"Project Jupiter (Oracle/STACK)"}
</td>
<td>
{"Santa Teresa, NM"}
</td>
<td>
{"Data center"}
</td>
<td>
{"13"}
</td>
<td>
{"19"}
</td>
</tr>
<tr>
<td>
{"Meta Hyperion (Project Sucre)"}
</td>
<td>
{"Richland Parish, LA"}
</td>
<td>
{"Data center"}
</td>
<td>
{"12"}
</td>
<td>
{"17"}
</td>
</tr>
<tr>
<td>
{"Vantage Port Washington"}
</td>
<td>
{"Port Washington, WI"}
</td>
<td>
{"Data center"}
</td>
<td>
{"13"}
</td>
<td>
{"19"}
</td>
</tr>
<tr>
<td>
{"Amazon New Carlisle"}
</td>
<td>
{"St. Joseph County, IN"}
</td>
<td>
{"Data center"}
</td>
<td>
{"11"}
</td>
<td>
{"16"}
</td>
</tr>
<tr>
<td>
{"Google New Albany (Montauk Innovations LLC)"}
</td>
<td>
{"New Albany, OH"}
</td>
<td>
{"Data center"}
</td>
<td>
{"10"}
</td>
<td>
{"15"}
</td>
</tr>
<tr>
<td>
{"Meta New Albany"}
</td>
<td>
{"New Albany, OH"}
</td>
<td>
{"Data center"}
</td>
<td>
{"11"}
</td>
<td>
{"16"}
</td>
</tr>
<tr>
<td>
{"Google Fort Wayne"}
</td>
<td>
{"Allen County, IN"}
</td>
<td>
{"Data center"}
</td>
<td>
{"8"}
</td>
<td>
{"12"}
</td>
</tr>
<tr>
<td>
{"Oracle/Crusoe Stargate Abilene"}
</td>
<td>
{"Abilene, TX"}
</td>
<td>
{"Data center"}
</td>
<td>
{"11"}
</td>
<td>
{"17"}
</td>
</tr>
<tr>
<td>
{"Homer City Energy Campus"}
</td>
<td>
{"Homer City, PA"}
</td>
<td>
{"Data center"}
</td>
<td>
{"9"}
</td>
<td>
{"14"}
</td>
</tr>
<tr>
<td>
{"Microsoft Mount Pleasant"}
</td>
<td>
{"Mount Pleasant, WI"}
</td>
<td>
{"Data center"}
</td>
<td>
{"6"}
</td>
<td>
{"12"}
</td>
</tr>
<tr>
<td>
{"Slavic Village hyperscale"}
</td>
<td>
{"Cleveland, OH"}
</td>
<td>
{"Data center"}
</td>
<td>
{"5"}
</td>
<td>
{"10"}
</td>
</tr>
<tr>
<td>
{"Amherst Nordson campus"}
</td>
<td>
{"Amherst, OH"}
</td>
<td>
{"Data center"}
</td>
<td>
{"1"}
</td>
<td>
{"5"}
</td>
</tr>
<tr>
<td>
{"Microsoft Licking County"}
</td>
<td>
{"Heath/Hebron, OH"}
</td>
<td>
{"Data center"}
</td>
<td>
{"9"}
</td>
<td>
{"15"}
</td>
</tr>
<tr>
<td>
{"Intel Ohio One"}
</td>
<td>
{"New Albany, OH"}
</td>
<td>
{"Other"}
</td>
<td>
{"8"}
</td>
<td>
{"5"}
</td>
</tr>
<tr>
<td>
{"Anduril Arsenal-1"}
</td>
<td>
{"Pickaway County, OH"}
</td>
<td>
{"Other"}
</td>
<td>
{"6"}
</td>
<td>
{"3"}
</td>
</tr>
<tr>
<td>
{"Hadrian Mesa factory"}
</td>
<td>
{"Mesa, AZ"}
</td>
<td>
{"Other"}
</td>
<td>
{"2"}
</td>
<td>
{"-1"}
</td>
</tr>
<tr>
<td>
{"Honda-LG battery plant"}
</td>
<td>
{"Fayette County, OH"}
</td>
<td>
{"Other"}
</td>
<td>
{"8"}
</td>
<td>
{"5"}
</td>
</tr>
<tr>
<td>
{"Micron Clay megafab"}
</td>
<td>
{"Clay, NY"}
</td>
<td>
{"Other"}
</td>
<td>
{"10"}
</td>
<td>
{"7"}
</td>
</tr>
<tr>
<td>
{"Ford BlueOval City"}
</td>
<td>
{"Stanton, TN"}
</td>
<td>
{"Other"}
</td>
<td>
{"5"}
</td>
<td>
{"2"}
</td>
</tr>
<tr>
<td>
{"Scout Motors (Project Connect)"}
</td>
<td>
{"Blythewood, SC"}
</td>
<td>
{"Other"}
</td>
<td>
{"8"}
</td>
<td>
{"5"}
</td>
</tr>
<tr>
<td>
{"Foxconn Wisconn Valley (2017)"}
</td>
<td>
{"Mount Pleasant, WI"}
</td>
<td>
{"Other"}
</td>
<td>
{"11"}
</td>
<td>
{"8"}
</td>
</tr>
<tr>
<td>
{"Code-named fulfillment center (generic)"}
</td>
<td>
{"Ohio"}
</td>
<td>
{"Other"}
</td>
<td>
{"5"}
</td>
<td>
{"7"}
</td>
</tr>
<tr>
<td>
{"Supplier plant (generic)"}
</td>
<td>
{"Midwest"}
</td>
<td>
{"Other"}
</td>
<td>
{"3"}
</td>
<td>
{"0"}
</td>
</tr>
<tr>
<td>
{"Saline Twp (Related / Oracle-OpenAI)"}
</td>
<td>
{"Saline Twp, MI"}
</td>
<td>
{"Data center"}
</td>
<td>
{"7"}
</td>
<td>
{"13"}
</td>
</tr>
<tr>
<td>
{"Microsoft Project Nova"}
</td>
<td>
{"Caledonia, WI"}
</td>
<td>
{"Data center"}
</td>
<td>
{"9"}
</td>
<td>
{"14"}
</td>
</tr>
<tr>
<td>
{"PRSM Preble County"}
</td>
<td>
{"Preble County, OH"}
</td>
<td>
{"Data center"}
</td>
<td>
{"5"}
</td>
<td>
{"11"}
</td>
</tr>
<tr>
<td>
{"CRG Project Cumulus"}
</td>
<td>
{"St. Charles, MO"}
</td>
<td>
{"Data center"}
</td>
<td>
{"10"}
</td>
<td>
{"16"}
</td>
</tr>
<tr>
<td>
{"Hancock County MegaSite"}
</td>
<td>
{"Buck Creek Twp, IN"}
</td>
<td>
{"Data center"}
</td>
<td>
{"8"}
</td>
<td>
{"13"}
</td>
</tr>
<tr>
<td>
{"Bristol Innovation Park"}
</td>
<td>
{"Bristol, IN"}
</td>
<td>
{"Data center"}
</td>
<td>
{"7"}
</td>
<td>
{"12"}
</td>
</tr>
<tr>
<td>
{"Howell Twp (Randee LLC)"}
</td>
<td>
{"Howell Twp, MI"}
</td>
<td>
{"Data center"}
</td>
<td>
{"6"}
</td>
<td>
{"11"}
</td>
</tr>
<tr>
<td>
{"QTS Dane County"}
</td>
<td>
{"DeForest, WI"}
</td>
<td>
{"Data center"}
</td>
<td>
{"9"}
</td>
<td>
{"15"}
</td>
</tr>
<tr>
<td>
{"Google Franklin Township"}
</td>
<td>
{"Indianapolis, IN"}
</td>
<td>
{"Data center"}
</td>
<td>
{"6"}
</td>
<td>
{"12"}
</td>
</tr>
<tr>
<td>
{"Panasonic De Soto (Project Ocean)"}
</td>
<td>
{"De Soto, KS"}
</td>
<td>
{"Other"}
</td>
<td>
{"9"}
</td>
<td>
{"6"}
</td>
</tr>
<tr>
<td>
{"Samsung Taylor (Project Silicon Silver)"}
</td>
<td>
{"Taylor, TX"}
</td>
<td>
{"Other"}
</td>
<td>
{"9"}
</td>
<td>
{"11"}
</td>
</tr>
<tr>
<td>
{"Hyundai Metaplant"}
</td>
<td>
{"Bryan County, GA"}
</td>
<td>
{"Other"}
</td>
<td>
{"7"}
</td>
<td>
{"4"}
</td>
</tr>
<tr>
<td>
{"Oak Run Solar"}
</td>
<td>
{"Madison County, OH"}
</td>
<td>
{"Other"}
</td>
<td>
{"4"}
</td>
<td>
{"8"}
</td>
</tr>
<tr>
<td>
{"Nucor Mason County"}
</td>
<td>
{"Point Pleasant, WV"}
</td>
<td>
{"Other"}
</td>
<td>
{"6"}
</td>
<td>
{"3"}
</td>
</tr>
<tr>
<td>
{"300 MW battery storage (generic)"}
</td>
<td>
{"Midwest"}
</td>
<td>
{"Other"}
</td>
<td>
{"2"}
</td>
<td>
{"6"}
</td>
</tr>
</tbody>
</table>
</div>
</details>
{"\n"}
</figure>
{"\n  "}
<div className={"measure"}>
{"\n    "}
<div className={"stats"}>
{"\n      "}
<div className={"stat"}>
<div className={"v alarm"}>
{"1 of 9"}
</div>
<div className={"l"}>
{"new data centers caught by the first rule (recall 0.11)"}
</div>
</div>
{"\n      "}
<div className={"stat"}>
<div className={"v"}>
{"9 of 9"}
</div>
<div className={"l"}>
{"caught by “100+ acres + a known data-center party”"}
</div>
</div>
{"\n      "}
<div className={"stat"}>
<div className={"v"}>
{"0"}
</div>
<div className={"l"}>
{"false alarms in 38 under that rule"}
</div>
</div>
{"\n      "}
<div className={"stat"}>
<div className={"v"}>
{"2"}
</div>
<div className={"l"}>
{"misses that survive every rule: both announced themselves on day one"}
</div>
</div>
{"\n    "}
</div>
{"\n    "}
<p>
{"The two persistent misses are Cleveland’s Slavic Village campus and the Nordson conversion in Amherst. The first was filed as a data center; the second was described that way at its first hearing. A method for spotting an undisclosed use has little to add when the use is already public. These misses still matter when you read the chart as a test of the whole sample."}
</p>
{"\n  "}
</div>
{"\n"}
</section>
{"\n\n"}
<section className={"finding"} id={"finding-3"}>
{"\n  "}
<div className={"measure"}>
{"\n    "}
<div className={"num"}>
{"03 / THE CLOCK"}
</div>
{"\n    "}
<h2>
{"The first filing can buy you time."}
</h2>
{"\n    "}
<p className={"lede"}>
{"I could find both a first public trace and a later disclosure date for 13 Midwest projects. The gap was 14 months at the median, though it varied a lot. Toledo was the longest: a shell company sought rezoning in late 2022, “data storage” appeared in a zoning amendment nine months later, and Meta’s name surfaced 28 months after the first filing. If you begin with the hearing agenda, you may miss the earlier trail in deeds and company records."}
</p>
{"\n  "}
</div>
{"\n  "}
<figure id={"f3"}>
{"\n    "}
<div className={"ftitle"}>
{"Months from first public record to disclosure of the end use"}
</div>
{"\n    "}
<div className={"fsub"}>
{"Thirteen Midwest projects where both dates are on the record."}
</div>
{"\n    "}
<div id={"c3"} className={"tt-dc-chart"} aria-label={"Interactive chart 3"}>
<p className={"tt-dc-chart-placeholder"}>
{"The interactive chart needs JavaScript. The data table follows."}
</p>
</div>
{"\n    "}
<div className={"fnote"}>
{"Toledo’s Meta site: 9 months to “data storage” use, 28 to the tenant’s name. Sources: Toledo Blade, DCD, Business Journal Daily, Journal-News, Wisconsin Watch, Crain’s Grand Rapids, IBJ, STLPR, Pittsburgh Business Times."}
</div>
{"\n  "}
<details className={"tbl"}>
<summary>
{"Show lead times as a table"}
</summary>
<div className={"scroll"}>
<table>
<thead>
<tr>
<th scope={"col"}>
{"Project"}
</th>
<th scope={"col"}>
{"Months"}
</th>
<th scope={"col"}>
{"First record to disclosure"}
</th>
<th scope={"col"}>
{"Dates"}
</th>
</tr>
</thead>
<tbody>
<tr>
<td>
{"Meta, Middleton Twp (Toledo)"}
</td>
<td>
{"28"}
</td>
<td>
{"Shell LLC rezoning → tenant named"}
</td>
<td>
{"Liames LLC, late 2022 → Apr 2025"}
</td>
</tr>
<tr>
<td>
{"Aligned, Pataskala (Columbus)"}
</td>
<td>
{"24"}
</td>
<td>
{"Deed → application"}
</td>
<td>
{"Nov 2023 → Nov 2025"}
</td>
</tr>
<tr>
<td>
{"Meta, Lebanon (Indianapolis)"}
</td>
<td>
{"24"}
</td>
<td>
{"Mayor's pursuit → disclosure"}
</td>
<td>
{"~2022 → Nov 2024"}
</td>
</tr>
<tr>
<td>
{"Prologis, Trenton (Cincinnati)"}
</td>
<td>
{"18"}
</td>
<td>
{"Purchase agreement → plans"}
</td>
<td>
{"Apr 2024 → Jan 2026"}
</td>
</tr>
<tr>
<td>
{"Bristolville 25, Lordstown (Youngstown)"}
</td>
<td>
{"17"}
</td>
<td>
{"Rezoning → site plan"}
</td>
<td>
{"May 2024 → Oct 2025"}
</td>
</tr>
<tr>
<td>
{"Meta, Beaver Dam (Madison)"}
</td>
<td>
{"14"}
</td>
<td>
{"Shell LLC NDA → announcement"}
</td>
<td>
{"Balloonist LLC, Dec 2023 → Feb 2025"}
</td>
</tr>
<tr>
<td>
{"Microsoft, Gaines Twp (Grand Rapids)"}
</td>
<td>
{"14"}
</td>
<td>
{"Deed → rezoning"}
</td>
<td>
{"Aug 2024 → Dec 2025"}
</td>
</tr>
<tr>
<td>
{"Bitdeer, Weathersfield (Youngstown)"}
</td>
<td>
{"9"}
</td>
<td>
{"Deed → investor update"}
</td>
<td>
{"May 2025 → Feb 2026"}
</td>
</tr>
<tr>
<td>
{"Google, Monrovia (Indianapolis)"}
</td>
<td>
{"9"}
</td>
<td>
{"PUD filing → tenant named"}
</td>
<td>
{"Jan 2025 → Oct 2025"}
</td>
</tr>
<tr>
<td>
{"Cloverleaf, Edwardsville (St. Louis)"}
</td>
<td>
{"9"}
</td>
<td>
{"City emails → disclosure"}
</td>
<td>
{"May 2025 → Feb 2026"}
</td>
</tr>
<tr>
<td>
{"QTS, DeForest (Madison)"}
</td>
<td>
{"8"}
</td>
<td>
{"State NDA → announcement"}
</td>
<td>
{"Feb 2025 → Oct 2025"}
</td>
</tr>
<tr>
<td>
{"Microsoft, Mount Pleasant (Milwaukee)"}
</td>
<td>
{"2"}
</td>
<td>
{"Village NDA → announcement (voluntary)"}
</td>
<td>
{"Jan 2023 → Mar 2023"}
</td>
</tr>
<tr>
<td>
{"Springdale (Pittsburgh)"}
</td>
<td>
{"1"}
</td>
<td>
{"Deed → council vote (voluntary)"}
</td>
<td>
{"Nov 2025 → Dec 2025"}
</td>
</tr>
</tbody>
</table>
</div>
</details>
{"\n"}
</figure>
{"\n"}
</section>
{"\n\n"}
<section className={"finding"} id={"finding-4"}>
{"\n  "}
<div className={"measure"}>
{"\n    "}
<div className={"num"}>
{"04 / THE NETWORK"}
</div>
{"\n    "}
<h2>
{"Some names turn up again."}
</h2>
{"\n    "}
<p className={"lede"}>
{"The company names change, but a few people appear in more than one filing. Indiana and Missouri records connect two managers to several LLCs associated with Google projects. The same lawyer appears on both Indiana filings in this set. That gives you names to search when a new LLC buys land. It does not prove who owns a new project; you still need the deed, the application or another direct link."}
</p>
{"\n  "}
</div>
{"\n  "}
<figure id={"f4"} className={"net"}>
{"\n    "}
<div className={"ftitle"}>
{"The Google shell network, as documented in public filings"}
</div>
{"\n    "}
<div className={"fsub"}>
{"Managers and counsel in the center; the LLCs they appear on; where each LLC surfaced."}
</div>
{"\n    "}
<div id={"c4"} className={"tt-dc-chart"} aria-label={"Interactive chart 4"}>
<p className={"tt-dc-chart-placeholder"}>
{"The interactive chart needs JavaScript. The data table follows."}
</p>
</div>
{"\n    "}
<div className={"fnote"}>
{"Deep Meadow Ventures: counsel stated on the record it “was created by Google” (MDC hearing, Aug 20, 2025). Spark Innovations and Groot linked by STLPR, Sept 8, 2025. Meta’s shells (Liames, Balloonist, Degas, Sidecat) and Oracle’s Green Chile Ventures follow the same pattern."}
</div>
{"\n  "}
<details className={"tbl"}>
<summary>
{"Show network names as a table"}
</summary>
<div className={"scroll"}>
<table>
<thead>
<tr>
<th scope={"col"}>
{"Name"}
</th>
<th scope={"col"}>
{"Type"}
</th>
<th scope={"col"}>
{"Where it appears"}
</th>
</tr>
</thead>
<tbody>
<tr>
<td>
{"Michael Montfort"}
</td>
<td>
{"Manager"}
</td>
<td>
{"Indiana and Missouri public filings"}
</td>
</tr>
<tr>
<td>
{"David Thomas"}
</td>
<td>
{"Manager"}
</td>
<td>
{"Indiana and Missouri public filings"}
</td>
</tr>
<tr>
<td>
{"Joseph Calderon"}
</td>
<td>
{"Counsel"}
</td>
<td>
{"Indiana Google filings"}
</td>
</tr>
<tr>
<td>
{"Deep Meadow Ventures"}
</td>
<td>
{"LLC"}
</td>
<td>
{"Franklin Township, Indiana"}
</td>
</tr>
<tr>
<td>
{"Morgan County Data Center I PUD"}
</td>
<td>
{"Filing"}
</td>
<td>
{"Monrovia, Indiana"}
</td>
</tr>
<tr>
<td>
{"Spark Innovations LLC"}
</td>
<td>
{"LLC"}
</td>
<td>
{"St. Charles, Missouri"}
</td>
</tr>
<tr>
<td>
{"Groot"}
</td>
<td>
{"LLC"}
</td>
<td>
{"St. Charles, Missouri"}
</td>
</tr>
<tr>
<td>
{"AG Rose Solutions"}
</td>
<td>
{"LLC"}
</td>
<td>
{"Kansas City"}
</td>
</tr>
<tr>
<td>
{"Peanut LLC"}
</td>
<td>
{"LLC"}
</td>
<td>
{"Virginia"}
</td>
</tr>
</tbody>
</table>
</div>
</details>
{"\n"}
</figure>
{"\n"}
</section>
{"\n\n"}
<section className={"finding"} id={"finding-5"}>
{"\n  "}
<div className={"measure"}>
{"\n    "}
<div className={"num"}>
{"05 / THE MAP"}
</div>
{"\n    "}
<h2>
{"The same proposal lands differently in different places."}
</h2>
{"\n    "}
<p className={"lede"}>
{"The regional count is uneven. Across four Northeast Ohio metros, I counted 15 proposals since 2022; seven had been withdrawn, rejected or stalled at the time of the sweep. I also found 30 local moratoriums in those metro counties. Pittsburgh’s area had seven proposals, one in the withdrawn or stalled group and one local moratorium in this count. Those numbers describe the records I found, not a vote on whether either region wants data centers. Zoning and site history matter too."}
</p>
{"\n  "}
</div>
{"\n  "}
<figure id={"f5"}>
{"\n    "}
<div className={"ftitle"}>
{"Pipeline and pushback, fourteen Midwest metros"}
</div>
{"\n    "}
<div className={"fsub"}>
{"Projects proposed since 2022 (bar), of which withdrawn, rejected or stalled (dark segment), and local moratoriums in force (number)."}
</div>
{"\n    "}
<div id={"c5"} className={"tt-dc-chart"} aria-label={"Interactive chart 5"}>
<p className={"tt-dc-chart-placeholder"}>
{"The interactive chart needs JavaScript. The data table follows."}
</p>
</div>
{"\n    "}
<div className={"keyrow"}>
<span>
<i className={"sw acc"}>

</i>
{"Live or built"}
</span>
<span>
<i className={"sw"} style={{"background": "var(--alarm)"} as CSSProperties}>

</i>
{"Withdrawn, rejected or stalled"}
</span>
</div>
{"\n    "}
<div className={"fnote"}>
{"Counts from the Oct 21, 2026 metro sweep; litigated-but-proceeding projects are counted as live. Moratoriums are municipal and county pauses in the metro’s counties, not statewide totals (Ohio ≥138; Michigan ≥52; Indiana ~17 counties)."}
</div>
{"\n  "}
<details className={"tbl"}>
<summary>
{"Show metro data as a table"}
</summary>
<div className={"scroll"}>
<table>
<thead>
<tr>
<th scope={"col"}>
{"Metro"}
</th>
<th scope={"col"}>
{"Proposed"}
</th>
<th scope={"col"}>
{"Dead or stalled"}
</th>
<th scope={"col"}>
{"Moratoriums"}
</th>
<th scope={"col"}>
{"Largest live proposal"}
</th>
</tr>
</thead>
<tbody>
<tr>
<td>
{"Chicago"}
</td>
<td>
{"14"}
</td>
<td>
{"7"}
</td>
<td>
{"2"}
</td>
<td>
{"Joliet 1.8 GW; Project Cardinal 1.8 GW"}
</td>
</tr>
<tr>
<td>
{"Detroit–Ann Arbor"}
</td>
<td>
{"9"}
</td>
<td>
{"7"}
</td>
<td>
{"2"}
</td>
<td>
{"Saline 1,383 MW"}
</td>
</tr>
<tr>
<td>
{"Indianapolis"}
</td>
<td>
{"8"}
</td>
<td>
{"2"}
</td>
<td>
{"3"}
</td>
<td>
{"Meta Lebanon $10B"}
</td>
</tr>
<tr>
<td>
{"Pittsburgh"}
</td>
<td>
{"7"}
</td>
<td>
{"1"}
</td>
<td>
{"1"}
</td>
<td>
{"Homer City 4.5 GW; Shippingport 2 GW; Upper Burrell 3 GW"}
</td>
</tr>
<tr>
<td>
{"Columbus"}
</td>
<td>
{"7"}
</td>
<td>
{"2"}
</td>
<td>
{"6"}
</td>
<td>
{"Meta Prometheus ~1 GW"}
</td>
</tr>
<tr>
<td>
{"St. Louis"}
</td>
<td>
{"7"}
</td>
<td>
{"1"}
</td>
<td>
{"3"}
</td>
<td>
{"CRG Festus $6B"}
</td>
</tr>
<tr>
<td>
{"Minneapolis–St. Paul"}
</td>
<td>
{"7"}
</td>
<td>
{"3"}
</td>
<td>
{"13"}
</td>
<td>
{"Tract Farmington ~$5B"}
</td>
</tr>
<tr>
<td>
{"Milwaukee–Madison"}
</td>
<td>
{"7"}
</td>
<td>
{"3"}
</td>
<td>
{"2"}
</td>
<td>
{"Vantage Port Washington $15B"}
</td>
</tr>
<tr>
<td>
{"Akron–Canton"}
</td>
<td>
{"5"}
</td>
<td>
{"2"}
</td>
<td>
{"11"}
</td>
<td>
{"Bitdeer/Geis Shalersville to 750 MW"}
</td>
</tr>
<tr>
<td>
{"Youngstown"}
</td>
<td>
{"5"}
</td>
<td>
{"3"}
</td>
<td>
{"7"}
</td>
<td>
{"McDonald Works to 900 MW (paper)"}
</td>
</tr>
<tr>
<td>
{"Cincinnati–Dayton"}
</td>
<td>
{"4"}
</td>
<td>
{"2"}
</td>
<td>
{"10"}
</td>
<td>
{"Trenton 250 MW"}
</td>
</tr>
<tr>
<td>
{"Grand Rapids"}
</td>
<td>
{"4"}
</td>
<td>
{"1"}
</td>
<td>
{"4"}
</td>
<td>
{"Microsoft Gaines 414 ac"}
</td>
</tr>
<tr>
<td>
{"Cleveland"}
</td>
<td>
{"3"}
</td>
<td>
{"2"}
</td>
<td>
{"7"}
</td>
<td>
{"H5 downtown expansion"}
</td>
</tr>
<tr>
<td>
{"Toledo"}
</td>
<td>
{"2"}
</td>
<td>
{"0"}
</td>
<td>
{"5"}
</td>
<td>
{"Meta Middleton $800M"}
</td>
</tr>
</tbody>
</table>
</div>
</details>
{"\n"}
</figure>
{"\n  "}
<div className={"measure"}>
{"\n    "}
<div className={"pull"}>
{"Several Pittsburgh-area proposals start on former industrial or power sites. That changes the zoning fight."}
<small>
{"In this review, Homer City, Shippingport and Upper Burrell did not need rezoning or a referendum. Their listed capacities are proposals, not operating load."}
</small>
</div>
{"\n  "}
</div>
{"\n"}
</section>
{"\n\n"}
<section className={"finding"} id={"finding-6"}>
{"\n  "}
<div className={"measure"}>
{"\n    "}
<div className={"num"}>
{"06 / THE ROUTINE"}
</div>
{"\n    "}
<h2>
{"Where I would look next"}
</h2>
{"\n    "}
<div className={"steps"}>
{"\n      "}
<div className={"step"}>
<div className={"k"}>
{"1"}
</div>
<div>
<h3>
{"Check the new land deals"}
</h3>
<p>
{"Start with large deeds, options and easements. For each buyer, check the Secretary of State record for its formation date and listed people. A familiar name is a lead worth filing away, not proof of the end use."}
</p>
</div>
</div>
{"\n      "}
<div className={"step"}>
<div className={"k"}>
{"2"}
</div>
<div>
<h3>
{"Map the land"}
</h3>
<p>
{"Group recordings by grantee, map contiguity, check annexation petitions. In Wisconsin, the DOR transfer return is free where the recorder charges by the search."}
</p>
</div>
</div>
{"\n      "}
<div className={"step"}>
<div className={"k"}>
{"3"}
</div>
<div>
<h3>
{"Look for new demand on the grid"}
</h3>
<p>
{"Check large-load and special-contract filings, plus air permits for backup generators. Keep generation projects separate: an 800 MW solar farm fooled my first scoring rule."}
</p>
</div>
</div>
{"\n      "}
<div className={"step"}>
<div className={"k"}>
{"4"}
</div>
<div>
<h3>
{"Find the jobs estimate"}
</h3>
<p>
{"Incentive applications often give both capital spending and permanent jobs. Very few jobs for a very large investment can fit a data center, but it is not a diagnosis on its own. Compare it with local factories, warehouses and utility projects."}
</p>
</div>
</div>
{"\n      "}
<div className={"step"}>
<div className={"k"}>
{"5"}
</div>
<div>
<h3>
{"Read the agendas"}
</h3>
<p>
{"A code name or NDA can tell you a deal is moving. It usually cannot tell you what will be built. Use it to set a date and find the related land and utility records."}
</p>
</div>
</div>
{"\n      "}
<div className={"step"}>
<div className={"k"}>
{"6"}
</div>
<div>
<h3>
{"Keep a dated lead log"}
</h3>
<p>
{"Write down the record, what it actually says and what you still need to check. Keep “possible,” “disclosed” and “built” separate. Plenty of proposals never reach construction."}
</p>
</div>
</div>
{"\n    "}
</div>
{"\n    "}
<h3 style={{"marginTop": "36px"} as CSSProperties}>
{"Nine more records worth checking"}
</h3>
{"\n    "}
<div className={"tells"}>
{"\n      "}
<div className={"tell"}>
<h3>
{"Utility land sales"}
</h3>
<p>
{"Xcel sold 348 acres at Becker to a Black & Veatch subsidiary for $7.7M in a regulatory filing. It flipped to Amazon for $73.5M."}
</p>
<span className={"where"}>
{"MN PUC, Sept 2022 → 2024"}
</span>
</div>
{"\n      "}
<div className={"tell"}>
<h3>
{"Load forecasts filed with the grid"}
</h3>
<p>
{"AES Ohio told PJM of nine hyperscale sites totaling 6,485 MW by 2033, none named."}
</p>
<span className={"where"}>
{"PJM LAS, Sept 2026"}
</span>
</div>
{"\n      "}
<div className={"tell"}>
<h3>
{"NDA logs"}
</h3>
<p>
{"Four Wisconsin villages and the state signed NDAs with Balloonist, Degas, Vantage and Microsoft. The agreement itself is a public record, even when what it covers is not."}
</p>
<span className={"where"}>
{"Wisconsin Watch, Jan 2026"}
</span>
</div>
{"\n      "}
<div className={"tell"}>
<h3>
{"Generator air permits"}
</h3>
<p>
{"One Elk Grove Village site sought permits for 112 three-megawatt backup generators. That scale is worth checking against the site’s other records."}
</p>
<span className={"where"}>
{"IEPA, Aug 2025"}
</span>
</div>
{"\n      "}
<div className={"tell"}>
<h3>
{"Federal water permits"}
</h3>
<p>
{"Groot, a Google-linked LLC, applied to the Army Corps for the St. Charles site while the city’s staff were under NDA."}
</p>
<span className={"where"}>
{"USACE / STLPR, 2025"}
</span>
</div>
{"\n      "}
<div className={"tell"}>
<h3>
{"Gas-supply contracts"}
</h3>
<p>
{"EQT signed with Homer City and Shippingport before site plans existed."}
</p>
<span className={"where"}>
{"BusinessWire, Jul 2025"}
</span>
</div>
{"\n      "}
<div className={"tell"}>
<h3>
{"EDC email"}
</h3>
<p>
{"“Project Peninsula,” 800 acres in Solon Township, surfaced only through a county records request."}
</p>
<span className={"where"}>
{"DCD, Jun 2026"}
</span>
</div>
{"\n      "}
<div className={"tell"}>
<h3>
{"Flips and renames"}
</h3>
<p>
{"Magellan Scientific held a Niles plant for five weeks before selling to Bitdeer’s White Tail Creek LLC. Acoma became Yucca Growth. Western Hospitality became Bristolville 25."}
</p>
<span className={"where"}>
{"Business Journal Daily, 2025–26"}
</span>
</div>
{"\n      "}
<div className={"tell"}>
<h3>
{"Transfer returns"}
</h3>
<p>
{"Wisconsin DOR data showed Vantage still buying in Port Washington, parcel by parcel, in Sept 2026."}
</p>
<span className={"where"}>
{"Ozaukee Press, Oct 2026"}
</span>
</div>
{"\n    "}
</div>
{"\n  "}
</div>
{"\n"}
</section>
{"\n\n"}
<div className={"measure"}>
{"\n  "}
<aside className={"method"}>
{"\n    "}
<h2>
{"What I checked, and what I still don’t know"}
</h2>
{"\n    "}
<p>
{"I scored 23 projects first: 13 data centers and 10 other large projects, including Intel Ohio One, Micron and Foxconn’s 2017 plan. Then I fixed the scoring rule and tried it on 15 more cases: nine data centers and six other projects chosen partly to challenge the power signal. I used information that was public before each project’s end use was disclosed."}
</p>
{"\n    "}
<ul>
{"\n      "}
<li>
{"I scored every case and knew the answer. Fixing the rule before the second set helps, but I could still have judged individual records differently because I knew what each project became. Another reader should score the filings without that knowledge."}
</li>
{"\n      "}
<li>
{"Thirty-eight selected cases are a small test. The accuracy figures are probably too optimistic. I would want a larger set, including ordinary local proposals, before using this as a prediction tool."}
</li>
{"\n      "}
<li>
{"The “who’s in the room” signal depends entirely on recognizing the names. A reader who didn’t look up PRSM, a land developer formed in 2022 that specializes in digital infrastructure, would have scored that case zero."}
</li>
{"\n      "}
<li>
{"Many comparison projects are well known. In a real search, the harder calls are anonymous LLCs that turn out to be warehouses, factories or solar projects. This test does not cover enough of those."}
</li>
{"\n      "}
<li>
{"I logged two calls to revisit: Sidecat LLC’s $42 million New Albany parcel bought in December 2025, and a search that found no comparable lead in Las Cruces, New Mexico, as of October 2026. Neither is a confirmed outcome. “No lead found” is especially easy to overstate."}
</li>
{"\n    "}
</ul>
{"\n    "}
<p style={{"margin": "12px 0 0", "fontFamily": "var(--mono)", "fontSize": "12.5px", "color": "var(--mute)"} as CSSProperties}>
{"Data files: dc_backtest_v0.csv (38 cases), metro_dc_profiles_v0.csv (14 metros), dc_watchlist_v0.csv (69 parties). Source document: AI Forecast 2027 working draft, Appendix E. These local data files are named in the source HTML but were not supplied with it; the charts use the arrays embedded in that HTML."}
</p>
{"\n  "}
</aside>
{"\n"}
</div>
{"\n"}
</div>
{"\n\n"}
</div>
{"\n  "}
<div className={"tt-dc-tip"} id={"tip"} role={"status"} aria-live={"off"}>

</div>
{"\n"}
</article>
{"\n"}
<nav className={"post-nav"} aria-label={"Article navigation"}>
<a href={"/whats-a-pinn/"} rel={"prev"}>
{"← What’s a PINN?"}
</a>
</nav>
{"\n"}
</main>
  );
}
