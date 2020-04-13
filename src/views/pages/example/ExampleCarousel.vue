<template>
  <div class="content-wrapper">
    <div class="content-section introduction">
      <div class="feature-intro">
        <h1>Carousel</h1>
        <p>Carousel is a content slider featuring various customization options.</p>
      </div>
    </div>
    <div class="content-section implementation">
      <Carousel :value="cars" :numVisible="4" :numScroll="3" :responsiveOptions="responsiveOptions">
        <template #header>
          <h2>Basic</h2>
        </template>
        <template #item="slotProps">
          <div class="car-details">
            <div class="p-grid p-nogutter">
              <div class="p-col-12">
                <img :src="slotProps.data.img" :alt="slotProps.data.name"/>
              </div>
              <div class="p-col-12 car-data">
                <div class="car-title">{{ slotProps.data.brand }}</div>
                <div class="car-subtitle">{{ slotProps.data.year }} | {{ slotProps.data.color }}</div>

                <div class="car-buttons">
                  <Button icon="pi pi-search" class="p-button-secondary"/>
                  <Button icon="pi pi-star" class="p-button-secondary"/>
                  <Button icon="pi pi-cog" class="p-button-secondary"/>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script>
  import Carousel from 'primevue/carousel';
  import Button from "primevue/button";

  export default {
    name: "ExampleCarousel",
    components: {
      Carousel,
      Button
    },
    data() {
      return {
        cars: [
          {
            id: 1,
            img: 'https://picsum.photos/536/354',
            name: 'pic1',
            brand: 'Mercedes',
            year: '1990',
            color: 'Black'
          },
          {
            id: 2,
            img: 'https://picsum.photos/536/354',
            name: 'pic2',
            brand: 'Mercedes',
            year: '1990',
            color: 'Black'
          },
          {
            id: 3,
            img: 'https://picsum.photos/536/354',
            name: 'pic3',
            brand: 'Mercedes',
            year: '1990',
            color: 'Black'
          },
          {
            id: 4,
            img: 'https://picsum.photos/536/354',
            name: 'pic4',
            brand: 'Mercedes',
            year: '1990',
            color: 'Black'
          },
          {
            id: 5,
            img: 'https://picsum.photos/536/354',
            name: 'pic5',
            brand: 'Mercedes',
            year: '1990',
            color: 'Black'
          },
          {
            id: 6,
            img: 'https://picsum.photos/536/354',
            name: 'pic6',
            brand: 'Mercedes',
            year: '1990',
            color: 'Black'
          }
        ],
        responsiveOptions: [
          {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
          },
          {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
          },
          {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
          }
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .p-carousel {
    .p-carousel-header {
      h2 {
        font-weight: 400;
        font-size: 18px;
        margin: 20px 0;
      }
    }

    .p-carousel-content {
      .p-carousel-item {
        .car-details {
          > .p-grid {
            border: 1px solid #b3c2ca;
            border-radius: 3px;
            margin: .3em;
            text-align: center;
            padding: 2em 0 2.25em 0;
          }
        }

        .car-data {
          .car-title {
            font-weight: 700;
            font-size: 20px;
            margin-top: 24px;
          }

          .car-subtitle {
            margin: .25em 0 2em 0;
          }

          button {
            margin-left: .5em;

            &:first-child {
              margin-left: 0;
            }
          }
        }
      }
    }

    &.custom-carousel {
      .p-carousel-dot-icon {
        width: 16px !important;
        height: 16px !important;
        border-radius: 50%;
      }
    }

    &.p-carousel-horizontal {
      .p-carousel-content {
        .p-carousel-item {
          &.p-carousel-item-start {
            .car-details {
              > .p-grid {
                margin-left: .6em;
              }
            }
          }

          &.p-carousel-item-end {
            .car-details {
              > .p-grid {
                margin-right: .6em;
              }
            }
          }
        }
      }
    }
  }

  /* Dark Theme such as luna-amber, luna-blue, luna-green and luna-pink */
  .dark-theme {
    .p-carousel {
      .p-carousel-content {
        .p-carousel-item {
          .car-details {
            > .p-grid {
              border: 1px solid #191919;
              background-color: #323232;
            }
          }
        }
      }
    }
  }
</style>
