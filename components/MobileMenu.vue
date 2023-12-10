<template>

  <b-sidebar :visible="mobileMenuStatus" @hidden="$emit('close')"
  backdrop
  >
    <ul class="main-menu">

      <li :key="index" v-for="(cat,index) in categories">
        <div class="menu-item-container">
          <nuxt-link :to="`/category/${cat.slug}`" class="menu-item"
                     :class="{'active': isActive(cat.slug, 0)}"
          >{{ cat.name }}
          </nuxt-link>
          <template v-if="cat.children.length">
            <i class="fa fa-minus float-right"
               @click="()=>toggleItem(cat.slug, 0)"
               v-if="isActive(cat.slug, 0)"></i>
            <i class="fa fa-plus float-right" v-else
               @click="()=>toggleItem(cat.slug, 0)"
            ></i>
          </template>
        </div>

        <ul class="sub-menu" v-if="cat.children.length" :class="[isActive(cat.slug, 0) ? 'open' : '']">
          <li :key="subCat.id" v-for="(subCat) in cat.children"
          >
            <div class="menu-item-container">
              <nuxt-link :to="`/category/${cat.slug}/${subCat.slug}`"
                         class="menu-item"
                         :class="{'active': isActive(subCat.slug, 1)}"
              >- {{ subCat.name }}
              </nuxt-link>

              <template v-if="subCat.children.length">
                <i class="fa fa-chevron-minus float-right"
                   @click="()=>toggleItem(subCat.slug, 1)"
                   v-if="isActive(subCat.slug, 1)"></i>
                <i class="fa fa-chevron-plus float-right" v-else
                   @click="()=>toggleItem(subCat.slug, 1)"
                ></i>
              </template>
            </div>


            <ul class="sub-sub-menu" v-if="subCat.children.length"
                :class="[isActive(subCat.slug, 1) ? 'open' : '']"
            >
              <li :key="subSubCat.id" v-for="(subSubCat) in subCat.children"
              >
                <div class="menu-item-container">
                  <nuxt-link class="menu-item"
                             :class="{'active': isActive(subSubCat.slug, 2)}"
                             :to="`/category/${cat.slug}/${subCat.slug}/${subSubCat.slug}`">-- {{ subSubCat.name }}
                  </nuxt-link>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </b-sidebar>

</template>
<script>
export default {
  props: {
    mobileMenuStatus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      category: '',
      subCategory: '',
      subSubCategory: '',
    }
  },
  computed: {
    categories() {
      return this.$store.state.product.categories;
    },
  },
  methods: {
    isActive(value, level = 0) {
      //return false; // this.category.includes(value);

      if (level === 0) {
        return this.category === value;
      }
      if (level === 1) {
        return this.subCategory === value;
      }
      if (level === 2) {
        return this.subSubCategory === value;
      }

    },
    toggleItem(item, level = 0) {
      if (level === 0) {
        this.isActive(item, level) ? this.category = '' : this.category = item;
      }
      if (level === 1) {
        this.isActive(item, level) ? this.subCategory = '' : this.subCategory = item;
      }
      if (level === 2) {
        this.isActive(item, level) ? this.subSubCategory = '' : this.subSubCategory = item;
      }
    }
  },
  mounted() {
    let {category, subCategory, subSubCategory} = this.$route.params;
    this.category = category;
    this.subCategory = subCategory;
    this.subSubCategory = subSubCategory;
  }
}
</script>

<style scoped lang="scss">
.main-menu {
  min-height: 60vh;
  margin-top: 15px;
  display: block;
  background-color: white;
  padding: 15px 0;
  max-height: 90vh;
  overflow-y: auto;

  li {
    display: block;
  }
}

.sub-menu {
  display: none;
  transition: 0.2s all ease-in-out;
  padding-left: 5px;

  &.open {
    display: block;
  }
}

.sub-sub-menu {
  display: none;

  &.open {
    display: block;
  }

}

.menu-item {
  display: block;
  font-weight: 600;
  text-transform: uppercase;
}

.menu-item.active {
  font-weight: bold;
}

.menu-item-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  transition: all ease-in-out 350ms;
  cursor: pointer;

  a{
    flex-grow: 1;
  }

  &:hover {
    background-color: #fafafa;
  }

}

</style>
