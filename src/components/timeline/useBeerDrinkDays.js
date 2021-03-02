import {
  isSameDay,
} from 'date-fns';
import firebase from 'gatsby-plugin-firebase';
import {
  uniq, toLower,
} from 'lodash';
import {
  useMemo, useCallback,
} from 'react';
import {
  useObjectVal,
} from 'react-firebase-hooks/database';

export function useBeerDrinkDays () {
  const [beerDrinkDaysRaw, isLoading] = useObjectVal(
    firebase?.database().ref('beerDrinkDays'),
  );
  const beerDrinkDays = useMemo(() => beerDrinkDaysRaw?.filter(Boolean) || [], [
    beerDrinkDaysRaw,
  ]);
  const database = firebase?.database();
  const ref = useMemo(() => database?.ref('beerDrinkDays'), [database]);
  const handleAddDay = useCallback(
    ({date = Date.now(), name}) => {
      const instance = {
        date: Number(date),
        name: [].concat(name).map((element) => element.toLowerCase()),
      };
      const dayIndex = beerDrinkDaysRaw.findIndex(({date}) => isSameDay(date, instance.date));
      if (dayIndex !== -1) {
        const {name} = beerDrinkDaysRaw[dayIndex];

        database
          .ref(`beerDrinkDays/${dayIndex}/name`)
          .set(uniq(name.map(toLower).concat(instance.name)));
      } else {
        database.ref('beerDrinkDays').set(beerDrinkDays.concat(instance));
      }
    },
    [database, beerDrinkDays, beerDrinkDaysRaw],
  );

  return {beerDrinkDays,
    database,
    handleAddDay,
    isLoading,
    ref};
}

// UPD SCRIPT
// useEffect(() => {
//   if (beerDrinkDays?.length)
//     database
//       .ref('beerDrinkDays')
//       .set(
//         beerDrinkDays.map(el =>
//           typeof el === 'number'
//             ? { date: Number(el), name: ['Mark', 'Ermakoy'] }
//             : el
//         )
//       );
// }, [beerDrinkDays?.length]);
