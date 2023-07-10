const { RESTDataSource } = require("apollo-datasource-rest");

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spacexdata.com/v2/";
  }

  async getAllLaunches() {
    const response = await this.get("launches");
    console.log("、あ、あ、あ、あ、あ、", Array.isArray(response));
    return Array.isArray(response)
      ? response.map((launch) => this.launchReducer(launch))
      : [];
  }

  launchReducer() {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_data_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
    };
  }

  async getLaunchById({ launchId }) {
    const response = await this.get("launches", { flight_number: launchId });
    return this.launchReducer(response[0]);
  }

  getLaunchesByIds({ launcheIds }) {
    return Promise.all(
      launchIds.map((launchId) => this.getLaunchById({ launchId }))
    );
  }
}

module.exports = LaunchAPI;
