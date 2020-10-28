import { useMemo, useCallback, useEffect } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { useObjectVal } from 'react-firebase-hooks/database';
import { isSameDay } from 'date-fns';

export function useBeerDrinkDays() {
  const [beerDrinkDaysRaw, isLoading] = useObjectVal(
    firebase?.database().ref('beerDrinkDays')
  );
  const beerDrinkDays = useMemo(() => beerDrinkDaysRaw?.filter(Boolean), [
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
    ({ day = Date.now(), name }) => {
      const instance = {
        date: Number(day),
        name: [].concat(name),
      };
      if (
        database &&
        !beerDrinkDays?.some(day => isSameDay(day, instance.date))
      ) {
        beerDrinkDays?.length > 0
          ? database
              .ref()
              .update({ beerDrinkDays: beerDrinkDays.concat(instance) })
          : database.ref('beerDrinkDays').set([instance]);
      }
    },
    [database, beerDrinkDays]
  );

  return { beerDrinkDays, isLoading, database, ref, handleAddDay };
}
