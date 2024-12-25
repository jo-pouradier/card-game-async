import {
  atOnceUsers,
  bodyString,
  exec,
  getParameter,
  group,
  incrementConcurrentUsers,
  jmesPath,
  jsonPath,
  pause,
  rampUsers,
  scenario,
  Session,
  simulation,
  StringBody,
} from "@gatling.io/core";
import { http, status } from "@gatling.io/http";

const httpProtocol = http
  .baseUrl("http://localhost:8083")
  .inferHtmlResources()
  .acceptHeader("application/json")
  .acceptEncodingHeader("gzip, deflate")
  .contentTypeHeader("application/json")
  .doNotTrackHeader("1");

const nbUsers = parseInt(getParameter("users", "-1"));
const timeRamp = parseInt(getParameter("ramp", "-1"));

const scn = scenario("RecordedSimulationAll").exec(
  group("Create").on(
    exec(session => session.set("randomId", Math.floor(Math.random() * 1000000))),
    http("Post form")
      .post("/user")
      .body(
        StringBody(
          JSON.stringify({
            login: "gatling #{randomId}",
            pwd: "gatling #{randomId}",
            lastName: "Gatling #{randomId}",
            surName: "gatling #{randomId}",
            email: "gatling#{randomId}@gmail.com",
          })
        )
      )
      .check(
        jmesPath("id").saveAs("id"),
        status().is(200),
      ),
  ),
  pause(1),
  group("Get data").on(
    http("Get all users").get("/users").check(status().is(200)),
    pause(1),
    http("Get All cards")
      .get("/cards")
      .check(jsonPath("$[0].id").exists().saveAs("cardId"), status().is(200)),
    pause(1),
    http("Get card by id").get(session => `/card/${session.get("cardId")}`).check(status().is(200)),
    pause(1),
    http("Get all cards to sell")
      .get("/store/cards_to_sell")
      .check(status().is(200))
  ),
  pause(1),
  http("Delete user").delete(session => `/user/${session.get('id')}`).check(status().is(200))
);

export default simulation((setUp) => {
  if (nbUsers > 0 && timeRamp > 0) {
    const nbSteps = 10;
    const stepUsers = Math.floor(nbUsers / nbSteps);
    const stepRamp = Math.floor(timeRamp / nbSteps);
    return setUp(
      scn
        // .injectOpen(rampUsers(nbUsers).during(timeRamp))
        .injectClosed(incrementConcurrentUsers(stepUsers).times(nbSteps).eachLevelLasting(stepRamp).separatedByRampsLasting(stepRamp))
        .protocols(httpProtocol)
    );
  }
  if (nbUsers > 0 && timeRamp < 0) {
    return setUp(scn.injectOpen(rampUsers(nbUsers).during(60))).protocols(httpProtocol);
  }
  setUp(scn.injectOpen(atOnceUsers(1))).protocols(httpProtocol);
  // set output name

});
