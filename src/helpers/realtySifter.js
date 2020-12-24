const realtySifter = (realty) => {
  return {
    'id': realty.id,
    'title': realty.title,
    'area': realty.area,
    'has_mall': realty.has_mall,
    'subway_distance': realty.subway_distance,
    'region': realty.region,
    'cost': realty.cost,
    'is_primary': realty.is_primary,
    'gotkeys_month': realty.gotkeys_month,
    'repairing': {
      'expencies': realty.repairing.expencies,
      'months': realty.repairing.months
    },
    'settling_expencies': realty.settling_expencies
  }
};

export default realtySifter;