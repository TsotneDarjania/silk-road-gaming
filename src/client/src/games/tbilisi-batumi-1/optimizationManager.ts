import { GameManager } from "./gameManager";
import { GamePlay } from "./scenes/gamePlay";

export class OptimizationManager {
  constructor(public scene: GamePlay, public gameManager: GameManager) {
    this.hideAllObject();
    this.checkGameZone(this.gameManager.saveZoneIndex);
  }

  hideAllObject() {
    this.scene.roadToGori.setVisible(false);
    this.scene.tbilisi.setVisible(false);

    const stars = this.scene.stars.slice(0, this.scene.stars.length);
    stars.forEach((stars) => {
      for (let i = 0; i < stars.stars.length; i++) {
        stars.stars[i].setVisible(false);
      }
    });

    this.scene.bombs.forEach((bomb) => {
      bomb.bombImage.setVisible(false);
      this.scene.matter.world.remove(bomb.deadZone);
    });

    const hideRoads = this.scene.roads.slice(0, this.scene.roads.length);
    hideRoads.forEach((road) => {
      this.scene.matter.world.remove(road.collider);
      road.polygon.setVisible(false);
    });

    const hideFlowers = this.scene.flowers.slice(0, this.scene.flowers.length);
    hideFlowers.forEach((flower) => {
      flower.setVisible(false);
    });

    const hideMonets = this.scene.monets.slice(0, this.scene.monets.length);
    hideMonets.forEach((monet) => {
      monet.setVisible(false);
      this.scene.matter.world.remove(monet.zone);
    });

    this.scene.rails.forEach((rail) => {
      rail.leftRail.setVisible(false);
      rail.rightRail.setVisible(false);
    });

    this.scene.train.frontVagon.setVisible(false);
    // this.scene.matter.world.remove(this.scene.train.frontVagon);
    this.scene.train.backVagon.setVisible(false);
    // this.scene.matter.world.remove(this.scene.train.backVagon);
    this.scene.train.leftCircle.setVisible(false);
    // this.scene.matter.world.remove(this.scene.train.leftCircle);
    this.scene.train.rightCircle.setVisible(false);
    // this.scene.matter.world.remove(this.scene.train.rightCircle);

    const hideAngels = this.scene.angels.slice(0, this.scene.angels.length);
    hideAngels.forEach((angel) => {
      angel.setVisible(false);
    });

    // this.scene.matter.world.remove(this.scene.russianTank.tankBody);
    this.scene.russianTank.tankBody.setVisible(false);

    // this.scene.russianSoldiers.forEach((soldier) => {
    //   //soldier.stopShoot();

    //   soldier.head.setVisible(false);
    //   // this.scene.matter.world.remove(soldier.head);
    //   soldier.body.setVisible(false);
    //   // this.scene.matter.world.remove(soldier.body);
    //   soldier.leftLeg.setVisible(false);
    //   // this.scene.matter.world.remove(soldier.leftLeg);
    //   soldier.rightLeg.setVisible(false);
    //   // this.scene.matter.world.remove(soldier.rightLeg);
    //   soldier.leftHand.setVisible(false);
    //   // this.scene.matter.world.remove(soldier.leftHand);
    //   soldier.rightHand.setVisible(false);
    //   //  this.scene.matter.world.remove(soldier.rightHand);

    //   // soldier.bodyHandAnimation.remove();
    //   // soldier.headAnimation.remove();

    //   soldier.bullets.forEach((bullet) => {
    //     bullet.setVisible(false);
    //     // this.scene.matter.world.remove(bullet);
    //   });
    // });
  }

  checkGameZone(index: number) {
    if (index === 0) {
      this.scene.tbilisi.setVisible(true);

      const roads = this.scene.roads.slice(0, 4);
      roads.forEach((road) => {
        this.scene.matter.world.add(road.collider);
        road.polygon.setVisible(true);
      });

      const flowers = this.scene.flowers.slice(0, 30);
      flowers.forEach((flower) => {
        flower.setVisible(true);
      });

      const monets = this.scene.monets.slice(0, 20);
      monets.forEach((monet) => {
        monet.setVisible(true);
        this.scene.matter.world.add(monet.zone);
      });

      const hideAngels = this.scene.angels.slice(0, 2);
      hideAngels.forEach((angel) => {
        angel.setVisible(true);
      });
    }
    if (index === 1) {
      this.scene.tbilisi.setVisible(true);
      this.scene.roadToGori.setVisible(true);

      const roads = this.scene.roads.slice(3, 9);
      roads.forEach((road) => {
        this.scene.matter.world.add(road.collider);
        road.polygon.setVisible(true);
      });

      const stars = this.scene.stars.slice(0, 2);
      stars.forEach((stars) => {
        for (let i = 0; i < stars.stars.length; i++) {
          stars.stars[i].setVisible(true);
        }
      });

      const flowers = this.scene.flowers.slice(23, 32);
      flowers.forEach((flower) => {
        flower.setVisible(true);
      });

      const monets = this.scene.monets.slice(15, 25);
      monets.forEach((monet) => {
        monet.setVisible(true);
        this.scene.matter.world.add(monet.zone);
      });

      const angels = this.scene.angels.slice(1, 4);
      angels.forEach((angel) => {
        angel.setVisible(true);
      });
    }
    if (index === 2) {
      this.scene.roadToGori.setVisible(true);

      const roads = this.scene.roads.slice(8, 11);
      roads.forEach((road) => {
        this.scene.matter.world.add(road.collider);
        road.polygon.setVisible(true);
      });

      const stars = this.scene.stars.slice(0, 3);
      stars.forEach((stars) => {
        for (let i = 0; i < stars.stars.length; i++) {
          stars.stars[i].setVisible(true);
        }
      });

      const flowers = this.scene.flowers.slice(25, 45);
      flowers.forEach((flower) => {
        flower.setVisible(true);
      });

      const monets = this.scene.monets.slice(10, 30);
      monets.forEach((monet) => {
        monet.setVisible(true);
        this.scene.matter.world.add(monet.zone);
      });

      const angels = this.scene.angels.slice(4, 7);
      angels.forEach((angel) => {
        angel.setVisible(true);
      });

      this.scene.bombs.forEach((bomb) => {
        bomb.bombImage.setVisible(true);
        this.scene.matter.world.add(bomb.deadZone);
      });
    }

    if (index === 3) {
      this.scene.roadToGori.setVisible(true);

      const roads = this.scene.roads.slice(10, 12);
      roads.forEach((road) => {
        this.scene.matter.world.add(road.collider);
        road.polygon.setVisible(true);
      });

      const stars = this.scene.stars.slice(1, 4);
      stars.forEach((stars) => {
        for (let i = 0; i < stars.stars.length; i++) {
          stars.stars[i].setVisible(true);
        }
      });

      const flowers = this.scene.flowers.slice(30, 45);
      flowers.forEach((flower) => {
        flower.setVisible(true);
      });

      const monets = this.scene.monets.slice(20, 40);
      monets.forEach((monet) => {
        monet.setVisible(true);
        this.scene.matter.world.add(monet.zone);
      });

      const angels = this.scene.angels.slice(5, 10);
      angels.forEach((angel) => {
        angel.setVisible(true);
      });

      this.scene.bombs.forEach((bomb) => {
        bomb.bombImage.setVisible(true);
        this.scene.matter.world.add(bomb.deadZone);
      });

      this.gameManager.asteroids.forEach((asteroid) => {
        asteroid.asteroid.setVisible(false);
        this.scene.matter.world.remove(asteroid.asteroid);
      });
    }
    if (index === 4) {
      this.scene.roadToGori.setVisible(true);

      const roads = this.scene.roads.slice(11, 14);
      roads.forEach((road) => {
        this.scene.matter.world.add(road.collider);
        road.polygon.setVisible(true);
      });

      const stars = this.scene.stars.slice(1, 4);
      stars.forEach((stars) => {
        for (let i = 0; i < stars.stars.length; i++) {
          stars.stars[i].setVisible(true);
        }
      });

      const flowers = this.scene.flowers.slice(30, 60);
      flowers.forEach((flower) => {
        flower.setVisible(true);
      });

      const monets = this.scene.monets.slice(20, 35);
      monets.forEach((monet) => {
        monet.setVisible(true);
        this.scene.matter.world.add(monet.zone);
      });

      const angels = this.scene.angels.slice(5, 10);
      angels.forEach((angel) => {
        angel.setVisible(true);
      });

      this.scene.bombs.forEach((bomb) => {
        bomb.bombImage.setVisible(false);
        this.scene.matter.world.remove(bomb.deadZone);
      });

      this.gameManager.asteroids.forEach((asteroid) => {
        asteroid.asteroid.setVisible(false);
        this.scene.matter.world.remove(asteroid.asteroid);
      });

      this.gameManager.skyRocks.forEach((rock) => {
        rock.rockImage.setVisible(false);
        this.scene.matter.world.remove(rock.rockImage);
      });
    }

    if (index === 5) {
      this.scene.roadToGori.setVisible(true);

      const roads = this.scene.roads.slice(13, 16);
      roads.forEach((road) => {
        this.scene.matter.world.add(road.collider);
        road.polygon.setVisible(true);
      });

      const stars = this.scene.stars.slice(2, 5);
      stars.forEach((stars) => {
        for (let i = 0; i < stars.stars.length; i++) {
          stars.stars[i].setVisible(true);
        }
      });

      const flowers = this.scene.flowers.slice(60, 75);
      flowers.forEach((flower) => {
        flower.setVisible(true);
      });

      const monets = this.scene.monets.slice(30, 55);
      monets.forEach((monet) => {
        monet.setVisible(true);
        this.scene.matter.world.add(monet.zone);
      });

      const angels = this.scene.angels.slice(4, 7);
      angels.forEach((angel) => {
        angel.setVisible(true);
      });

      this.scene.bombs.forEach((bomb) => {
        bomb.bombImage.setVisible(false);
        this.scene.matter.world.remove(bomb.deadZone);
      });

      this.gameManager.asteroids.forEach((asteroid) => {
        asteroid.asteroid.setVisible(false);
        this.scene.matter.world.remove(asteroid.asteroid);
      });

      this.gameManager.skyRocks.forEach((rock) => {
        rock.rockImage.setVisible(false);
        this.scene.matter.world.remove(rock.rockImage);
      });

      this.scene.russianSoldiers.forEach((soldier) => {
        soldier.stopShoot();
        soldier.head.setVisible(false);
        soldier.body.setVisible(false);
        soldier.leftLeg.setVisible(false);
        soldier.rightLeg.setVisible(false);
        soldier.leftHand.setVisible(false);
        soldier.rightHand.setVisible(false);

        this.scene.matter.world.remove(soldier.head);
        this.scene.matter.world.remove(soldier.body);
        this.scene.matter.world.remove(soldier.leftLeg);
        this.scene.matter.world.remove(soldier.rightLeg);
        this.scene.matter.world.remove(soldier.leftHand);
        this.scene.matter.world.remove(soldier.rightHand);

        soldier.bullets.forEach((bullet) => {
          bullet.setVisible(false);
        });
      });

      this.scene.russianTank.tankBody.setVisible(true);
    }

    if (index === 6) {
      this.scene.roadToGori.setVisible(true);

      const roads = this.scene.roads.slice(14, 17);
      roads.forEach((road) => {
        this.scene.matter.world.add(road.collider);
        road.polygon.setVisible(true);
      });

      const stars = this.scene.stars.slice(3, 10);
      stars.forEach((stars) => {
        for (let i = 0; i < stars.stars.length; i++) {
          stars.stars[i].setVisible(true);
        }
      });

      const flowers = this.scene.flowers.slice(60, 85);
      flowers.forEach((flower) => {
        flower.setVisible(true);
      });

      const monets = this.scene.monets.slice(30, 55);
      monets.forEach((monet) => {
        monet.setVisible(true);
        this.scene.matter.world.add(monet.zone);
      });

      const angels = this.scene.angels.slice(4, 7);
      angels.forEach((angel) => {
        angel.setVisible(true);
      });

      this.scene.bombs.forEach((bomb) => {
        bomb.bombImage.setVisible(false);
        this.scene.matter.world.remove(bomb.deadZone);
      });

      this.gameManager.asteroids.forEach((asteroid) => {
        asteroid.asteroid.setVisible(false);
        this.scene.matter.world.remove(asteroid.asteroid);
      });

      this.gameManager.skyRocks.forEach((rock) => {
        rock.rockImage.setVisible(false);
        this.scene.matter.world.remove(rock.rockImage);
      });

      this.scene.russianSoldiers.forEach((soldier) => {
        soldier.stopShoot();
        soldier.head.setVisible(false);
        soldier.body.setVisible(false);
        soldier.leftLeg.setVisible(false);
        soldier.rightLeg.setVisible(false);
        soldier.leftHand.setVisible(false);
        soldier.rightHand.setVisible(false);

        this.scene.matter.world.remove(soldier.head);
        this.scene.matter.world.remove(soldier.body);
        this.scene.matter.world.remove(soldier.leftLeg);
        this.scene.matter.world.remove(soldier.rightLeg);
        this.scene.matter.world.remove(soldier.leftHand);
        this.scene.matter.world.remove(soldier.rightHand);

        soldier.bullets.forEach((bullet) => {
          bullet.setVisible(false);
        });
      });

      this.scene.matter.world.remove(this.scene.russianTank.tankBody);

      this.scene.train.frontVagon.setVisible(true);
      this.scene.train.backVagon.setVisible(true);
      this.scene.train.leftCircle.setVisible(true);
      this.scene.train.rightCircle.setVisible(true);

      this.scene.rails.forEach((rail) => {
        rail.leftRail.setVisible(true);
        rail.rightRail.setVisible(true);
      });
    }

    if (index === 7) {
      const roads = this.scene.roads.slice(15, 17);
      roads.forEach((road) => {
        this.scene.matter.world.add(road.collider);
        road.polygon.setVisible(true);
      });

      const stars = this.scene.stars.slice(6, 8);
      stars.forEach((stars) => {
        for (let i = 0; i < stars.stars.length; i++) {
          stars.stars[i].setVisible(true);
        }
      });

      const flowers = this.scene.flowers.slice(31, 100);
      flowers.forEach((flower) => {
        flower.setVisible(true);
      });

      const monets = this.scene.monets.slice(30, 55);
      monets.forEach((monet) => {
        monet.setVisible(true);
        this.scene.matter.world.add(monet.zone);
      });

      const angels = this.scene.angels.slice(4, 7);
      angels.forEach((angel) => {
        angel.setVisible(true);
      });

      this.scene.bombs.forEach((bomb) => {
        bomb.bombImage.setVisible(false);
        this.scene.matter.world.remove(bomb.deadZone);
      });

      this.gameManager.asteroids.forEach((asteroid) => {
        asteroid.asteroid.setVisible(false);
        this.scene.matter.world.remove(asteroid.asteroid);
      });

      this.gameManager.skyRocks.forEach((rock) => {
        rock.rockImage.setVisible(false);
        this.scene.matter.world.remove(rock.rockImage);
      });

      this.scene.russianSoldiers.forEach((soldier) => {
        soldier.stopShoot();
        soldier.head.setVisible(false);
        soldier.body.setVisible(false);
        soldier.leftLeg.setVisible(false);
        soldier.rightLeg.setVisible(false);
        soldier.leftHand.setVisible(false);
        soldier.rightHand.setVisible(false);

        this.scene.matter.world.remove(soldier.head);
        this.scene.matter.world.remove(soldier.body);
        this.scene.matter.world.remove(soldier.leftLeg);
        this.scene.matter.world.remove(soldier.rightLeg);
        this.scene.matter.world.remove(soldier.leftHand);
        this.scene.matter.world.remove(soldier.rightHand);

        soldier.bullets.forEach((bullet) => {
          bullet.setVisible(false);
        });
      });

      this.scene.russianTank.tankBody.setVisible(false);
      this.scene.matter.world.remove(this.scene.russianTank.tankBody);

      this.scene.rails.forEach((rail) => {
        rail.leftRail.setVisible(false);
        rail.rightRail.setVisible(false);
      });

      if (this.scene.monsters.length < 1) {
        this.scene.addMonsters();
      }

      if (this.scene.evilFaces.length < 1) {
        this.scene.addEvilFaces();
      }
    }

    if (index === 8) {
      {
        const roads = this.scene.roads.slice(15, 19);
        roads.forEach((road) => {
          this.scene.matter.world.add(road.collider);
          road.polygon.setVisible(true);
        });

        const stars = this.scene.stars.slice(7, 11);
        stars.forEach((stars) => {
          for (let i = 0; i < stars.stars.length; i++) {
            stars.stars[i].setVisible(true);
          }
        });

        const flowers = this.scene.flowers.slice(90, 130);
        flowers.forEach((flower) => {
          flower.setVisible(true);
        });

        const monets = this.scene.monets.slice(43, 50);
        monets.forEach((monet) => {
          monet.setVisible(true);
          this.scene.matter.world.add(monet.zone);
        });

        const angels = this.scene.angels.slice(5, 9);
        angels.forEach((angel) => {
          angel.setVisible(true);
        });

        this.scene.bombs.forEach((bomb) => {
          bomb.bombImage.setVisible(false);
          this.scene.matter.world.remove(bomb.deadZone);
        });

        this.gameManager.asteroids.forEach((asteroid) => {
          asteroid.asteroid.setVisible(false);
          this.scene.matter.world.remove(asteroid.asteroid);
        });

        this.gameManager.skyRocks.forEach((rock) => {
          rock.rockImage.setVisible(false);
          this.scene.matter.world.remove(rock.rockImage);
        });

        this.scene.russianSoldiers.forEach((soldier) => {
          soldier.stopShoot();
          soldier.head.setVisible(false);
          soldier.body.setVisible(false);
          soldier.leftLeg.setVisible(false);
          soldier.rightLeg.setVisible(false);
          soldier.leftHand.setVisible(false);
          soldier.rightHand.setVisible(false);

          this.scene.matter.world.remove(soldier.head);
          this.scene.matter.world.remove(soldier.body);
          this.scene.matter.world.remove(soldier.leftLeg);
          this.scene.matter.world.remove(soldier.rightLeg);
          this.scene.matter.world.remove(soldier.leftHand);
          this.scene.matter.world.remove(soldier.rightHand);

          soldier.bullets.forEach((bullet) => {
            bullet.setVisible(false);
          });
        });

        this.scene.russianTank.tankBody.setVisible(false);
        this.scene.matter.world.remove(this.scene.russianTank.tankBody);

        this.scene.rails.forEach((rail) => {
          rail.leftRail.setVisible(false);
          rail.rightRail.setVisible(false);
        });

        if (this.scene.monsters.length < 1) {
          this.scene.addMonsters();
        }

        if (this.scene.evilFaces.length < 1) {
          this.scene.addEvilFaces();
        }
      }
    }

    if (index === 9) {
      {
        const roads = this.scene.roads.slice(15, 21);
        roads.forEach((road) => {
          this.scene.matter.world.add(road.collider);
          road.polygon.setVisible(true);
        });

        const stars = this.scene.stars.slice(7, 11);
        stars.forEach((stars) => {
          for (let i = 0; i < stars.stars.length; i++) {
            stars.stars[i].setVisible(true);
          }
        });

        const flowers = this.scene.flowers.slice(105, 130);
        flowers.forEach((flower) => {
          flower.setVisible(true);
        });

        const monets = this.scene.monets.slice(43, 50);
        monets.forEach((monet) => {
          monet.setVisible(true);
          this.scene.matter.world.add(monet.zone);
        });

        const angels = this.scene.angels.slice(5, 9);
        angels.forEach((angel) => {
          angel.setVisible(true);
        });

        this.scene.bombs.forEach((bomb) => {
          bomb.bombImage.setVisible(false);
          this.scene.matter.world.remove(bomb.deadZone);
        });

        this.gameManager.asteroids.forEach((asteroid) => {
          asteroid.asteroid.setVisible(false);
          this.scene.matter.world.remove(asteroid.asteroid);
        });

        this.gameManager.skyRocks.forEach((rock) => {
          rock.rockImage.setVisible(false);
          this.scene.matter.world.remove(rock.rockImage);
        });

        this.scene.russianSoldiers.forEach((soldier) => {
          soldier.stopShoot();
          soldier.head.setVisible(false);
          soldier.body.setVisible(false);
          soldier.leftLeg.setVisible(false);
          soldier.rightLeg.setVisible(false);
          soldier.leftHand.setVisible(false);
          soldier.rightHand.setVisible(false);

          this.scene.matter.world.remove(soldier.head);
          this.scene.matter.world.remove(soldier.body);
          this.scene.matter.world.remove(soldier.leftLeg);
          this.scene.matter.world.remove(soldier.rightLeg);
          this.scene.matter.world.remove(soldier.leftHand);
          this.scene.matter.world.remove(soldier.rightHand);

          soldier.bullets.forEach((bullet) => {
            bullet.setVisible(false);
          });
        });

        this.scene.russianTank.tankBody.setVisible(false);
        this.scene.matter.world.remove(this.scene.russianTank.tankBody);

        this.scene.rails.forEach((rail) => {
          rail.leftRail.setVisible(false);
          rail.rightRail.setVisible(false);
        });

        if (this.scene.monsters.length < 1) {
          this.scene.addMonsters();
        }

        if (this.scene.evilFaces.length < 1) {
          this.scene.addEvilFaces();
        }
      }
    }
  }
}
