import classNames from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { defaultCategories } from '../../util/constants';
import { CategoryDescription, OnCategory } from '../../types';
import { messages } from '../i18n';
import {
  CategoryDescriptionMap,
  CategoryGroupKey,
  CategoryId,
} from './categories';
import * as styles from './styles';

export interface Props {
  dynamicCategories?: CategoryId[];
  activeCategoryId?: CategoryId;
  disableCategories?: boolean;
  onCategorySelected?: OnCategory;
}

export interface State {
  categories: CategoryId[];
}

export type CategoryMap = {
  [id: string]: CategoryDescription;
};

export const sortCategories = (c1: CategoryGroupKey, c2: CategoryGroupKey) =>
  CategoryDescriptionMap[c1].order - CategoryDescriptionMap[c2].order;

const addNewCategories = (
  oldCategories: CategoryId[],
  newCategories?: CategoryId[],
): CategoryId[] => {
  if (!newCategories) {
    return oldCategories;
  }
  return oldCategories
    .concat(
      newCategories.filter(category => !!CategoryDescriptionMap[category]),
    )
    .sort(sortCategories);
};

export default class CategorySelector extends PureComponent<Props, State> {
  static defaultProps = {
    onCategorySelected: () => {},
    dynamicCategories: [],
  };

  constructor(props: Props) {
    super(props);
    const { dynamicCategories } = props;

    let categories = defaultCategories;
    if (dynamicCategories) {
      categories = addNewCategories(categories, dynamicCategories);
    }
    this.state = {
      categories,
    };
  }

  onClick = (categoryId: CategoryId) => {
    const { onCategorySelected } = this.props;
    if (onCategorySelected) {
      onCategorySelected(categoryId);
    }
  };

  UNSAFE_componentWillUpdate(nextProps: Props) {
    if (this.props.dynamicCategories !== nextProps.dynamicCategories) {
      this.setState({
        categories: addNewCategories(
          defaultCategories,
          nextProps.dynamicCategories,
        ),
      });
    }
  }

  render() {
    const { disableCategories } = this.props;
    const { categories } = this.state;
    let categoriesSection;
    if (categories) {
      categoriesSection = (
        <ul>
          {categories.map((categoryId: CategoryId) => {
            const category = CategoryDescriptionMap[categoryId];
            const categoryClasses = [styles.category];
            if (categoryId === this.props.activeCategoryId) {
              categoryClasses.push(styles.active);
            }

            const onClick = (e: React.SyntheticEvent) => {
              e.preventDefault();
              // ignore if disabled
              if (!disableCategories) {
                this.onClick(categoryId);
              }
            };
            if (disableCategories) {
              categoryClasses.push(styles.disable);
            }

            const Icon = category.icon;
            return (
              <li key={category.id}>
                <FormattedMessage {...messages[category.name]}>
                  {categoryName => (
                    <button
                      data-category-id={category.id}
                      className={classNames(categoryClasses)}
                      onClick={onClick}
                      title={categoryName as string}
                    >
                      <Icon label={categoryName} />
                    </button>
                  )}
                </FormattedMessage>
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <div className={classNames([styles.categorySelector])}>
        {categoriesSection}
      </div>
    );
  }
}
