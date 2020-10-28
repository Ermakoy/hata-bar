import { useMemo, useCallback, useEffect } from 'react';
import { intersection, uniq, toLower } from 'lodash';
import firebase from 'gatsby-plugin-firebase';
import { useObjectVal } from 'react-firebase-hooks/database';
import { isSameDay } from 'date-fns';

export function useBeerDrinkDays() {
  const [beerDrinkDaysRaw, isLoading] = useObjectVal(
    firebase?.database().ref('beerDrinkDays')
  );
  const beerDrinkDays = useMemo(() => beerDrinkDaysRaw?.filter(Boolean) || [], [
    beerDrinkDaysRaw,
  ]);
  const database = useMemo(() => firebase?.database(), [firebase]);
  const ref = useMemo(() => database?.ref('beerDrinkDays'), [database]);
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
  const handleAddDay = useCallback(
    ({ date = Date.now(), name }) => {
      const instance = {
        date: Number(date),
        name: [].concat(name).map(el => el.toLowerCase()),
      };

      const dayIndex = beerDrinkDaysRaw.findIndex(({ date }) =>
        isSameDay(date, instance.date)
      );
      if (dayIndex !== -1) {
        const { name } = beerDrinkDaysRaw[dayIndex];

        database
          .ref(`beerDrinkDays/${dayIndex}/name`)
          .set(uniq(name.map(toLower).concat(instance.name)));
      } else {
        console.log({ instance });
        database.ref('beerDrinkDays').set(beerDrinkDays.concat(instance));
      }
    },
    [database, beerDrinkDays]
  );

  return { beerDrinkDays, isLoading, database, ref, handleAddDay };
}
