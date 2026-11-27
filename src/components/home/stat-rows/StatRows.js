import React, { useState, useEffect } from 'react';
import StatRow from './StatRow';
import './StatRows.scss';
import HabitStatisticService from '../../../services/habit/HabitStatisticService';
import { useTranslation } from '../../../services/translation/TranslationService';

const findCount = (items, keywords) => {
  const item = items.find((i) =>
    keywords.some((word) => i.habitItem?.toLowerCase().includes(word))
  );
  return item ? item.notTakenItems : 0;
};

const StatRows = () => {
  const [homePageHabitStats, setHomePageHabitStats] = useState([]);
  const { currentLanguage } = useTranslation();

  useEffect(() => {
    const fetchStats = async () => {
      let items = [];
      try {
        const data =
          await HabitStatisticService.getTodayStatisticsForAllHabitItems(currentLanguage);
        items = Array.isArray(data) ? data : [];
      } catch (error) {
        console.error('Failed to load habit statistics:', error);
      }
      setHomePageHabitStats([
        {
          actionKey: 'homepage.stats.bags.action',
          captionKey: 'homepage.stats.bags.caption',
          questionKey: 'homepage.stats.bags.question',
          linkKey: 'homepage.stats.bags.link',
          count: findCount(items, ['bag', 'пакет', 'сумк']),
          iconPath: 'assets/img/habit-pic-bag.png'
        },
        {
          actionKey: 'homepage.stats.cups.action',
          captionKey: 'homepage.stats.cups.caption',
          questionKey: 'homepage.stats.cups.question',
          linkKey: 'homepage.stats.cups.link',
          count: findCount(items, ['cup', 'склян', 'стакан', 'чашк']),
          iconPath: 'assets/img/habit-pic-cup.png'
        }
      ]);
    };

    fetchStats();
  }, [currentLanguage]);

  return (
    <div id="stat-rows">
      {homePageHabitStats.map((stat, index) => (
        <StatRow key={index} stat={stat} index={index + 1} />
      ))}
    </div>
  );
};

export default StatRows;
