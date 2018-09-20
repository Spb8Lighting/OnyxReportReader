<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:xdt="http://www.w3.org/2005/xpath-datatypes">
	<xsl:output method="html" version="1.1" encoding="UTF-8" indent="yes"/>

	<xsl:key name="AnalogFaderPage" match="AnalogFader" use="@playbackPage"/>
	<xsl:key name="PlaybackButtonPage" match="PlayBackButton" use="@playbackPage"/>
	<xsl:key name="PlaybackFaderBank" match="PlayBackFader" use="@playbackPage"/>

	<xsl:template match="/">
		<xsl:element name="html">
			<xsl:element name="head">
				<xsl:element name="link"><xsl:attribute name="rel">stylesheet</xsl:attribute><xsl:attribute name="type">text/css</xsl:attribute><xsl:attribute name="href">CuelistReportStyles.css</xsl:attribute></xsl:element>
				<xsl:element name="title">&quot;<xsl:value-of select="CueLists/@showName"/>&quot; - Maxxyz Cuelists Report</xsl:element>
			</xsl:element>
			<xsl:element name="body">
				<xsl:element name="h1">&quot;<xsl:value-of select="CueLists/@showName"/>&quot; - Maxxyz Cuelists Report</xsl:element>
				<xsl:element name="p">
					<xsl:attribute name="class">body</xsl:attribute>
					This report lists cuelists for show &quot;<xsl:value-of select="CueLists/@showName"/>&quot; <xsl:element name="b">(requires software build <xsl:value-of select="CueLists/@showBuild"/>)</xsl:element>.
				</xsl:element>
				<xsl:apply-templates select="@* | node()"/>
			</xsl:element>
		</xsl:element>
	</xsl:template>

	<xsl:template match="CueLists">
		<xsl:element name="h2">
			<xsl:attribute name="class">headline</xsl:attribute>
			<xsl:text>Contents</xsl:text>
		</xsl:element>
		<xsl:element name="dl">
			<xsl:if test="Cuelist">
				<xsl:element name="dd">
					<xsl:attribute name="class">body</xsl:attribute>
					<xsl:element name="a"><xsl:attribute name="href">#Cuelist</xsl:attribute>Cuelists</xsl:element>
					<xsl:element name="dl">
						<xsl:for-each select="Cuelist">
							<xsl:sort select="@visualId" data-type="number"/>
							<xsl:element name="dd">
								<xsl:attribute name="class">body</xsl:attribute>
								<xsl:call-template name="CuelistNameHyperlink">
									<xsl:with-param name="Cuelist" select="."/>
								</xsl:call-template>
							</xsl:element>
						</xsl:for-each>
					</xsl:element>
				</xsl:element>
			</xsl:if>
			<xsl:if test="Chase">
				<xsl:element name="dd">
					<xsl:attribute name="class">body</xsl:attribute>
					<xsl:element name="a"><xsl:attribute name="href">#Chase</xsl:attribute>Chases</xsl:element>
					<xsl:element name="dl">
						<xsl:for-each select="Chase">
							<xsl:sort select="@visualId" data-type="number"/>
							<xsl:element name="dd">
								<xsl:attribute name="class">body</xsl:attribute>
								<xsl:call-template name="CuelistNameHyperlink">
									<xsl:with-param name="Cuelist" select="."/>
								</xsl:call-template>
							</xsl:element>
						</xsl:for-each>
					</xsl:element>
				</xsl:element>
			</xsl:if>
			<xsl:if test="Override">
				<xsl:element name="dd">
					<xsl:attribute name="class">body</xsl:attribute>
					<xsl:element name="a"><xsl:attribute name="href">#Override</xsl:attribute>Overrides</xsl:element>
					<xsl:element name="dl">
						<xsl:for-each select="Override">
							<xsl:sort select="@visualId" data-type="number"/>
							<xsl:element name="dd">
								<xsl:attribute name="class">body</xsl:attribute>
								<xsl:call-template name="CuelistNameHyperlink">
									<xsl:with-param name="Cuelist" select="."/>
								</xsl:call-template>
							</xsl:element>
						</xsl:for-each>
					</xsl:element>
				</xsl:element>
			</xsl:if>
			<xsl:if test="Groupmaster">
				<xsl:element name="dd">
					<xsl:attribute name="class">body</xsl:attribute>
					<xsl:element name="a"><xsl:attribute name="href">#Groupmaster</xsl:attribute>Groupmasters</xsl:element>
					<xsl:element name="dl">
						<xsl:for-each select="Groupmaster">
							<xsl:sort select="@visualId" data-type="number"/>
							<xsl:element name="dd">
								<xsl:attribute name="class">body</xsl:attribute>
								<xsl:call-template name="CuelistNameHyperlink">
									<xsl:with-param name="Cuelist" select="."/>
								</xsl:call-template>
							</xsl:element>
						</xsl:for-each>
					</xsl:element>
				</xsl:element>
			</xsl:if>
			<xsl:if test="Submaster">
				<xsl:element name="dd">
					<xsl:attribute name="class">body</xsl:attribute>
					<xsl:element name="a"><xsl:attribute name="href">#Submaster</xsl:attribute>Submasters</xsl:element>
					<xsl:element name="dl">
						<xsl:for-each select="Submaster">
							<xsl:sort select="@visualId" data-type="number"/>
							<xsl:element name="dd">
								<xsl:attribute name="class">body</xsl:attribute>
								<xsl:call-template name="CuelistNameHyperlink">
									<xsl:with-param name="Cuelist" select="."/>
								</xsl:call-template>
							</xsl:element>
						</xsl:for-each>
					</xsl:element>
				</xsl:element>
			</xsl:if>
			<xsl:if test="Timecode">
				<xsl:element name="dd">
					<xsl:attribute name="class">body</xsl:attribute>
					<xsl:element name="a"><xsl:attribute name="href">#Timecode</xsl:attribute>Timecode lists</xsl:element>
					<xsl:element name="dl">
						<xsl:for-each select="Timecode">
							<xsl:sort select="@visualId" data-type="number"/>
							<xsl:element name="dd">
								<xsl:attribute name="class">body</xsl:attribute>
								<xsl:call-template name="CuelistNameHyperlink">
									<xsl:with-param name="Cuelist" select="."/>
								</xsl:call-template>
							</xsl:element>
						</xsl:for-each>
					</xsl:element>
				</xsl:element>
			</xsl:if>
			<xsl:if test="//PlayBackButton">
				<xsl:element name="dd">
					<xsl:attribute name="class">body</xsl:attribute>
					<xsl:element name="a"><xsl:attribute name="href">#PlaybackButtonIndex</xsl:attribute>Playback button index</xsl:element>
				</xsl:element>
			</xsl:if>
			<xsl:if test="//PlayBackFader">
				<xsl:element name="dd">
					<xsl:attribute name="class">body</xsl:attribute>
					<xsl:element name="a"><xsl:attribute name="href">#PlaybackFaderIndex</xsl:attribute>Playback fader index</xsl:element>
				</xsl:element>
			</xsl:if>
			<xsl:if test="//AnalogFader">
				<xsl:element name="dd">
					<xsl:attribute name="class">body</xsl:attribute>
					<xsl:element name="a"><xsl:attribute name="href">#AnalogFaderIndex</xsl:attribute>Analog fader index</xsl:element>
				</xsl:element>
			</xsl:if>
			<xsl:if test="//WingButton">
				<xsl:element name="dd">
					<xsl:attribute name="class">body</xsl:attribute>
					<xsl:element name="a"><xsl:attribute name="href">#PlaybackButtonModuleIndex</xsl:attribute>Playback button module index</xsl:element>
				</xsl:element>
			</xsl:if>
			<xsl:if test="*[not(AnalogFader) and not(PlayBackButton) and not(PlayBackFader) and not(WingButton)]">
				<xsl:element name="dd">
					<xsl:attribute name="class">body</xsl:attribute>
					<xsl:element name="a"><xsl:attribute name="href">#UnreferencedIndex</xsl:attribute>Cuelists only available from Cuelist Directory</xsl:element>
				</xsl:element>
			</xsl:if>
		</xsl:element>
		<xsl:if test="Cuelist">
			<xsl:call-template name="Category">
				<xsl:with-param name="name">Cuelist</xsl:with-param>
			</xsl:call-template>
		</xsl:if>
		<xsl:if test="Chase">
			<xsl:call-template name="Category">
				<xsl:with-param name="name">Chase</xsl:with-param>
			</xsl:call-template>
		</xsl:if>
		<xsl:if test="Override">
			<xsl:call-template name="Category">
				<xsl:with-param name="name">Override</xsl:with-param>
			</xsl:call-template>
		</xsl:if>
		<xsl:if test="Groupmaster">
			<xsl:call-template name="Category">
				<xsl:with-param name="name">Groupmaster</xsl:with-param>
			</xsl:call-template>
		</xsl:if>
		<xsl:if test="Submaster">
			<xsl:call-template name="Category">
				<xsl:with-param name="name">Submaster</xsl:with-param>
			</xsl:call-template>
		</xsl:if>
		<xsl:if test="Timecode">
			<xsl:call-template name="Category">
				<xsl:with-param name="name">Timecode</xsl:with-param>
			</xsl:call-template>
		</xsl:if>
		<xsl:if test="//PlayBackButton">
			<xsl:call-template name="PlaybackButtonIndex"/>
		</xsl:if>
		<xsl:if test="//PlayBackFader">
			<xsl:call-template name="PlaybackFaderIndex"/>
		</xsl:if>
		<xsl:if test="//AnalogFader">
			<xsl:call-template name="AnalogFaderIndex"/>
		</xsl:if>
		<xsl:if test="//WingButton">
			<xsl:call-template name="PlaybackButtonModuleIndex"/>
		</xsl:if>
		<xsl:if test="*[not(AnalogFader) and not(PlayBackButton) and not(PlayBackFader) and not(WingButton)]">
			<xsl:call-template name="Unreferenced"/>
		</xsl:if>
	</xsl:template>

	<xsl:template match="Cue | Link">
		<xsl:variable name="cueClass">
			<xsl:choose>
				<xsl:when test="(position() mod 2) = 1">bodyOdd</xsl:when>
				<xsl:otherwise>bodyEven</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:element name="tr">
			<xsl:element name="td">
				<xsl:attribute name="class"><xsl:value-of select="$cueClass"/></xsl:attribute>
				<xsl:attribute name="VALIGN">TOP</xsl:attribute>
				<xsl:attribute name="ALIGN">RIGHT</xsl:attribute>
				<xsl:element name="b"><xsl:value-of select="@cueId"/></xsl:element>
			</xsl:element>
			<xsl:element name="td">
				<xsl:attribute name="class"><xsl:value-of select="$cueClass"/></xsl:attribute>
				<xsl:attribute name="VALIGN">TOP</xsl:attribute>
				<xsl:value-of select="@cueName"/>
				<xsl:if test="name() = 'Link'">
					<xsl:if test="string-length(@cueName) != 0">
						<xsl:element name="br"/>
					</xsl:if>
					<xsl:element name="b">Link to cue</xsl:element><xsl:text> </xsl:text><xsl:value-of select="@linkToCue"/><xsl:text> (</xsl:text><xsl:value-of select="@linkCount"/><xsl:text> times)</xsl:text>
				</xsl:if>
			</xsl:element>
			<xsl:if test="name(parent::*) = 'Cuelist' or name(parent::*) = 'Timecode'">
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$cueClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:value-of select="@trigger"/>
					<xsl:if test="@trigger = 'Wait' or @trigger = 'Follow'">
						<xsl:text> </xsl:text><xsl:value-of select="@time"/>
					</xsl:if>
				</xsl:element>
			</xsl:if>
			<xsl:if test="name(parent::*) = 'Timecode'">
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$cueClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:attribute name="ALIGN">RIGHT</xsl:attribute>
					<xsl:value-of select="@timeCode"/>
				</xsl:element>
			</xsl:if>
			<xsl:if test="name(parent::*) = 'Cuelist' or name(parent::*) = 'Timecode' or (name(parent::*) = 'Chase' and parent::*/@useCueTiming = 'True')">
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$cueClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:attribute name="ALIGN">RIGHT</xsl:attribute>
					<xsl:value-of select="@delay"/>
				</xsl:element>
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$cueClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:attribute name="ALIGN">RIGHT</xsl:attribute>
					<xsl:value-of select="@fade"/>
				</xsl:element>
			</xsl:if>
			<xsl:if test="name(parent::*) != 'Groupmaster' and name(parent::*) != 'Submaster'">
				<xsl:element name="td">
					<xsl:attribute name="class"><xsl:value-of select="$cueClass"/></xsl:attribute>
					<xsl:attribute name="VALIGN">TOP</xsl:attribute>
					<xsl:value-of select="@fadeMode"/>
				</xsl:element>
			</xsl:if>
			<xsl:element name="td">
				<xsl:attribute name="class"><xsl:value-of select="$cueClass"/></xsl:attribute>
				<xsl:attribute name="VALIGN">TOP</xsl:attribute>
				<xsl:attribute name="ALIGN">CENTER</xsl:attribute>
				<xsl:if test="@markCue = 'True'">M</xsl:if>
<!--
				<xsl:if test="@usesBase = 'True'">B</xsl:if>
				<xsl:if test="@usesFx = 'True'"><xsl:if test="@usesBase = 'True'"><xsl:text> </xsl:text></xsl:if><xsl:text>FX</xsl:text></xsl:if>
				<xsl:if test="@usesTiming = 'True'"><xsl:if test="@usesBase = 'True' or @usesFx = 'True'"><xsl:text> </xsl:text></xsl:if><xsl:text>T</xsl:text></xsl:if>
-->
			</xsl:element>
			<xsl:element name="td">
				<xsl:attribute name="class"><xsl:value-of select="$cueClass"/></xsl:attribute>
				<xsl:attribute name="VALIGN">TOP</xsl:attribute>
				<xsl:value-of select="@comment"/>
			</xsl:element>
		</xsl:element>
	</xsl:template>

	<xsl:template match="Cuelist | Chase | Override | Groupmaster | Submaster | Timecode">
		<xsl:element name="dd">
			<xsl:element name="p">
				<xsl:attribute name="class">subheadline</xsl:attribute>
				<xsl:attribute name="id"><xsl:value-of select="generate-id(.)"/></xsl:attribute>
				<xsl:call-template name="CuelistName">
					<xsl:with-param name="Cuelist" select="."/>
				</xsl:call-template>
			</xsl:element>

			<xsl:element name="dl">

				<!-- CUELIST, CHASE, OVERRIDE, TIMECODE -->
				<xsl:if test="@priorityLevel">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Priority: </xsl:text><xsl:value-of select="@priorityLevel"/>
					</xsl:element>
				</xsl:if>
				<xsl:if test="@tracking = 'True'">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Tracking</xsl:text>
					</xsl:element>
				</xsl:if>
				<xsl:if test="@backTrack = 'True'">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Backtrack</xsl:text><xsl:element name="br"/>
					</xsl:element>
				</xsl:if>
				<xsl:if test="@markMode">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:value-of select="@markMode"/><xsl:element name="br"/>
					</xsl:element>
				</xsl:if>
				<xsl:if test="@autoRelease = 'True'">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Autorelease</xsl:text><xsl:element name="br"/>
					</xsl:element>
				</xsl:if>
				<xsl:if test="@releaseOnNextGo = 'True'">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Release on next GO</xsl:text><xsl:element name="br"/>
					</xsl:element>
				</xsl:if>

				<xsl:if test="@releasewhenRestart = 'True'">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Release when Restart</xsl:text><xsl:element name="br"/>
					</xsl:element>
				</xsl:if>

				<xsl:if test="@defaultReleaseTime">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Default Release Time: </xsl:text><xsl:value-of select="@defaultReleaseTime div 1000"/>s<xsl:element name="br"/>
					</xsl:element>
				</xsl:if>
				<xsl:if test="@releaseDimmersFirst = 'True'">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Release Dimmers first</xsl:text><xsl:element name="br"/>
					</xsl:element>
				</xsl:if>
				<xsl:if test="@ignoreGlobalRelease = 'True'">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Ignore Global Release</xsl:text><xsl:element name="br"/>
					</xsl:element>
				</xsl:if>

				<xsl:if test="@defaultButtonBehaviour">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Default Button Behavior: </xsl:text><xsl:value-of select="@defaultButtonBehaviour"/>
						<xsl:if test="@defaultButtonBehaviour = 'Flash'">
							<xsl:if test="@flashGo = 'True'">
								<xsl:text> [DOWN -&gt; +GO]</xsl:text>
							</xsl:if>
							<xsl:if test="@flashRelease = 'True'">
								<xsl:text> [UP -&gt; +RELEASE]</xsl:text>
							</xsl:if>
						</xsl:if>
					</xsl:element>
				</xsl:if>

				<xsl:if test="@triggerLevel">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Trigger level: </xsl:text><xsl:value-of select="@triggerLevel"/><xsl:element name="br"/>
					</xsl:element>
				</xsl:if>
				<xsl:if test="@faderGo = 'True'">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Fader: UP -&gt; +GO</xsl:text><xsl:element name="br"/>
					</xsl:element>
				</xsl:if>
				<xsl:if test="@faderRelease = 'True'">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Fader: DOWN -&gt; +RELEASE</xsl:text><xsl:element name="br"/>
					</xsl:element>
				</xsl:if>

				<!-- CHASE -->
				<xsl:if test="@useCueTiming = 'True'">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Chase: Use Timing</xsl:text><xsl:element name="br"/>
					</xsl:element>
				</xsl:if>
				<xsl:if test="@chaseRate">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Chase Rate: </xsl:text><xsl:value-of select="@chaseRate"/><xsl:element name="br"/>
					</xsl:element>
				</xsl:if>
				<xsl:if test="@chaseFade">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Chase Fade: </xsl:text><xsl:value-of select="@chaseFade"/>%<xsl:element name="br"/>
					</xsl:element>
				</xsl:if>
				<xsl:if test="@chaseDirection">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Chase Direction: </xsl:text><xsl:value-of select="@chaseDirection"/><xsl:element name="br"/>
					</xsl:element>
				</xsl:if>

				<!-- SUBMASTER -->
				<xsl:if test="@overRidableByProgrammer = 'True'">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Overridable By Programmer</xsl:text><xsl:element name="br"/>
					</xsl:element>
				</xsl:if>
				<xsl:if test="@swop = 'True'">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Go Button -&gt; SWOP</xsl:text><xsl:element name="br"/>
					</xsl:element>
				</xsl:if>
				<xsl:if test="@ignoreBankChangeRelease = 'True'">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>Ignore Bank Change Release</xsl:text><xsl:element name="br"/>
					</xsl:element>
				</xsl:if>

				<!-- TIMECODE -->
				<xsl:if test="@timeCodeSource">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:text>TimeCode source: </xsl:text><xsl:value-of select="@timeCodeSource"/><xsl:element name="br"/>
					</xsl:element>
				</xsl:if>

				<xsl:element name="dd">
					<xsl:element name="table">
						<xsl:attribute name="class">table</xsl:attribute>
						<!-- <xsl:attribute name="border">1</xsl:attribute> -->
						<xsl:element name="thead">
							<xsl:element name="tr">
								<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute><xsl:attribute name="ALIGN">RIGHT</xsl:attribute>#</xsl:element>
								<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Cue</xsl:element>
								<xsl:if test="name() = 'Cuelist' or name() = 'Timecode'">
									<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Trigger</xsl:element>
								</xsl:if>
								<xsl:if test="name() = 'Timecode'">
									<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute><xsl:attribute name="ALIGN">RIGHT</xsl:attribute>Time</xsl:element>
								</xsl:if>
								<xsl:if test="name() = 'Cuelist' or name() = 'Timecode' or (name() = 'Chase' and @useCueTiming = 'True')">
									<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute><xsl:attribute name="ALIGN">RIGHT</xsl:attribute>Delay</xsl:element>
									<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute><xsl:attribute name="ALIGN">RIGHT</xsl:attribute>Fade</xsl:element>
								</xsl:if>
								<xsl:if test="name() != 'Groupmaster' and name() != 'Submaster'">
									<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Fade mode</xsl:element>
								</xsl:if>
								<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute><xsl:attribute name="ALIGN">CENTER</xsl:attribute>Uses</xsl:element>
								<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Comment</xsl:element>
							</xsl:element>
						</xsl:element>
						<xsl:element name="tbody">
							<xsl:apply-templates select="Cue | Link"/>
						</xsl:element>
					</xsl:element>
				</xsl:element>

				<xsl:if test="PlayBackButton">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:element name="b"><xsl:text>Referenced from playback buttons:</xsl:text></xsl:element>
						<xsl:element name="dl">
							<xsl:apply-templates select="PlayBackButton"/>
						</xsl:element>
					</xsl:element>
				</xsl:if>

				<xsl:if test="PlayBackFader">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:element name="b"><xsl:text>Referenced from playback faders:</xsl:text></xsl:element>
						<xsl:element name="dl">
							<xsl:apply-templates select="PlayBackFader"/>
						</xsl:element>
					</xsl:element>
				</xsl:if>

				<xsl:if test="AnalogFader">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:element name="b"><xsl:text>Referenced from analog faders:</xsl:text></xsl:element>
						<xsl:element name="dl">
							<xsl:apply-templates select="AnalogFader"/>
						</xsl:element>
					</xsl:element>
				</xsl:if>

				<xsl:if test="WingButton">
					<xsl:element name="dd">
						<xsl:attribute name="class">body</xsl:attribute>
						<xsl:element name="b"><xsl:text>Referenced from playback buttons on button module(s):</xsl:text></xsl:element>
						<xsl:element name="dl">
							<xsl:apply-templates select="WingButton"/>
						</xsl:element>
					</xsl:element>
				</xsl:if>
			</xsl:element>
		</xsl:element>
	</xsl:template>

	<xsl:template match="AnalogFader">
		<xsl:element name="dd">
			<xsl:attribute name="class">body</xsl:attribute>
			<xsl:text>Bank </xsl:text><xsl:value-of select="@playbackPage"/><xsl:text>, number </xsl:text><xsl:value-of select="@buttonPosition"/>
		</xsl:element>
	</xsl:template>

	<xsl:template match="PlayBackButton">
		<xsl:element name="dd">
			<xsl:attribute name="class">body</xsl:attribute>
			<xsl:text>Page </xsl:text><xsl:value-of select="@playbackPage"/><xsl:text>, number </xsl:text><xsl:value-of select="@buttonPosition"/>
		</xsl:element>
	</xsl:template>

	<xsl:template match="PlayBackFader">
		<xsl:element name="dd">
			<xsl:attribute name="class">body</xsl:attribute>
			<xsl:text>Bank </xsl:text><xsl:value-of select="@playbackPage"/><xsl:text>, number </xsl:text><xsl:value-of select="@playbackNumber"/>
		</xsl:element>
	</xsl:template>
	
	<xsl:template match="WingButton">
		<xsl:element name="dd">
			<xsl:attribute name="class">body</xsl:attribute>
			<xsl:text>Number </xsl:text><xsl:value-of select="@buttonPosition"/>
		</xsl:element>
	</xsl:template>

	<xsl:template name="Category">
		<xsl:param name="name"/>
		<xsl:element name="h2">
			<xsl:attribute name="class">headline</xsl:attribute>
			<xsl:attribute name="id"><xsl:value-of select="$name"/></xsl:attribute>
			<xsl:value-of select="$name"/><xsl:text> (</xsl:text><xsl:value-of select="count(*[name() = $name])"/><xsl:text> total)</xsl:text>
		</xsl:element>
		<xsl:element name="dl">
			<xsl:apply-templates select="*[name() = $name]">
				<xsl:sort select="@visualId" data-type="number"/>
			</xsl:apply-templates>
		</xsl:element>
	</xsl:template>

	<xsl:template match="*" mode="index">
		<xsl:variable name="cueClass">
			<xsl:choose>
				<xsl:when test="(position() mod 2) = 1">bodyOdd</xsl:when>
				<xsl:otherwise>bodyEven</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:element name="tr">
			<xsl:element name="td">
				<xsl:attribute name="class"><xsl:value-of select="$cueClass"/></xsl:attribute>
				<xsl:attribute name="VALIGN">TOP</xsl:attribute>
				<xsl:attribute name="ALIGN">RIGHT</xsl:attribute>
				<xsl:element name="b"><xsl:value-of select="@buttonPosition"/></xsl:element>
			</xsl:element>
			<xsl:element name="td">
				<xsl:attribute name="class"><xsl:value-of select="$cueClass"/></xsl:attribute>
				<xsl:attribute name="VALIGN">TOP</xsl:attribute>
				<xsl:call-template name="CuelistNameHyperlink">
					<xsl:with-param name="Cuelist" select="parent::*"/>
				</xsl:call-template>
			</xsl:element>
		</xsl:element>
	</xsl:template>

	<xsl:template match="PlayBackFader" mode="index">
		<xsl:variable name="cueClass">
			<xsl:choose>
				<xsl:when test="(position() mod 2) = 1">bodyOdd</xsl:when>
				<xsl:otherwise>bodyEven</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:element name="tr">
			<xsl:element name="td">
				<xsl:attribute name="class"><xsl:value-of select="$cueClass"/></xsl:attribute>
				<xsl:attribute name="VALIGN">TOP</xsl:attribute>
				<xsl:attribute name="ALIGN">RIGHT</xsl:attribute>
				<xsl:element name="b"><xsl:value-of select="@playbackNumber"/></xsl:element>
			</xsl:element>
			<xsl:element name="td">
				<xsl:attribute name="class"><xsl:value-of select="$cueClass"/></xsl:attribute>
				<xsl:attribute name="VALIGN">TOP</xsl:attribute>
				<xsl:call-template name="CuelistNameHyperlink">
					<xsl:with-param name="Cuelist" select="parent::*"/>
				</xsl:call-template>
			</xsl:element>
		</xsl:element>
	</xsl:template>

	<xsl:template name="AnalogFaderIndex">
		<xsl:element name="h2">
			<xsl:attribute name="class">headline</xsl:attribute>
			<xsl:attribute name="id">AnalogFaderIndex</xsl:attribute>
			<xsl:text>Analog fader index (</xsl:text><xsl:value-of select="count(//AnalogFader)"/><xsl:text> total)</xsl:text>
		</xsl:element>
		<xsl:element name="dl">
			<xsl:for-each select="//AnalogFader[count(. | key('AnalogFaderPage', @playbackPage)[1]) = 1]">
				<xsl:sort select="@playbackPage" data-type="number"/>
				<xsl:element name="dd">
					<xsl:element name="h2">
						<xsl:attribute name="class">subheadline</xsl:attribute>
						<xsl:text>Bank </xsl:text><xsl:value-of select="@playbackPage"/>
					</xsl:element>
					<xsl:element name="table">
						<xsl:attribute name="class">table</xsl:attribute>
						<!-- <xsl:attribute name="border">1</xsl:attribute> -->
						<xsl:element name="thead">
							<xsl:element name="tr">
								<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute><xsl:attribute name="ALIGN">RIGHT</xsl:attribute>Number</xsl:element>
								<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Cuelist</xsl:element>
							</xsl:element>
						</xsl:element>
						<xsl:element name="tbody">
							<xsl:apply-templates select="key('AnalogFaderPage', @playbackPage)" mode="index">
								<xsl:sort select="@buttonPosition" data-type="number"/>
							</xsl:apply-templates>
						</xsl:element>
					</xsl:element>
				</xsl:element>
			</xsl:for-each>
		</xsl:element>
	</xsl:template>

	<xsl:template name="PlaybackButtonIndex">
		<xsl:element name="h2">
			<xsl:attribute name="class">headline</xsl:attribute>
			<xsl:attribute name="id">PlaybackButtonIndex</xsl:attribute>
			<xsl:text>Playback button index (</xsl:text><xsl:value-of select="count(//PlayBackButton)"/><xsl:text> total)</xsl:text>
		</xsl:element>
		<xsl:element name="dl">
			<xsl:for-each select="//PlayBackButton[count(. | key('PlaybackButtonPage', @playbackPage)[1]) = 1]">
				<xsl:sort select="@playbackPage" data-type="number"/>
				<xsl:element name="dd">
					<xsl:element name="h2">
						<xsl:attribute name="class">subheadline</xsl:attribute>
						<xsl:text>Page </xsl:text><xsl:value-of select="@playbackPage"/>
					</xsl:element>
					<xsl:element name="table">
						<xsl:attribute name="class">table</xsl:attribute>
						<!-- <xsl:attribute name="border">1</xsl:attribute> -->
						<xsl:element name="thead">
							<xsl:element name="tr">
								<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute><xsl:attribute name="ALIGN">RIGHT</xsl:attribute>Number</xsl:element>
								<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Cuelist</xsl:element>
							</xsl:element>
						</xsl:element>
						<xsl:element name="tbody">
							<xsl:apply-templates select="key('PlaybackButtonPage', @playbackPage)" mode="index">
								<xsl:sort select="@buttonPosition" data-type="number"/>
							</xsl:apply-templates>
						</xsl:element>
					</xsl:element>
				</xsl:element>
			</xsl:for-each>
		</xsl:element>
	</xsl:template>

	<xsl:template name="PlaybackFaderIndex">
		<xsl:element name="h2">
			<xsl:attribute name="class">headline</xsl:attribute>
			<xsl:attribute name="id">PlaybackFaderIndex</xsl:attribute>
			<xsl:text>Playback fader index (</xsl:text><xsl:value-of select="count(//PlayBackFader)"/><xsl:text> total)</xsl:text>
		</xsl:element>
		<xsl:element name="dl">
			<xsl:for-each select="//PlayBackFader[count(. | key('PlaybackFaderBank', @playbackPage)[1]) = 1]">
				<xsl:sort select="@playbackPage" data-type="number"/>
				<xsl:element name="dd">
					<xsl:element name="h2">
						<xsl:attribute name="class">subheadline</xsl:attribute>
						<xsl:text>Bank </xsl:text><xsl:value-of select="@playbackPage"/><xsl:text> - </xsl:text><xsl:value-of select="@playbackBankName"/>
					</xsl:element>
					<xsl:element name="table">
						<xsl:attribute name="class">table</xsl:attribute>
						<!-- <xsl:attribute name="border">1</xsl:attribute> -->
						<xsl:element name="thead">
							<xsl:element name="tr">
								<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute><xsl:attribute name="ALIGN">RIGHT</xsl:attribute>Number</xsl:element>
								<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Cuelist</xsl:element>
							</xsl:element>
						</xsl:element>
						<xsl:element name="tbody">
							<xsl:apply-templates select="key('PlaybackFaderBank', @playbackPage)" mode="index">
								<xsl:sort select="@playbackNumber" data-type="number"/>
							</xsl:apply-templates>
						</xsl:element>
					</xsl:element>
				</xsl:element>
			</xsl:for-each>
		</xsl:element>
	</xsl:template>

	<xsl:template name="PlaybackButtonModuleIndex">
		<xsl:element name="h2">
			<xsl:attribute name="class">headline</xsl:attribute>
			<xsl:attribute name="id">PlaybackButtonModuleIndex</xsl:attribute>
			<xsl:text>Playback button module index (</xsl:text><xsl:value-of select="count(//WingButton)"/><xsl:text> total)</xsl:text>
		</xsl:element>
		<xsl:element name="dl">
			<xsl:element name="table">
				<xsl:attribute name="class">table</xsl:attribute>
				<!-- <xsl:attribute name="border">1</xsl:attribute> -->
				<xsl:element name="thead">
					<xsl:element name="tr">
						<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute><xsl:attribute name="ALIGN">RIGHT</xsl:attribute>Number</xsl:element>
						<xsl:element name="th"><xsl:attribute name="class">header</xsl:attribute>Cuelist</xsl:element>
					</xsl:element>
				</xsl:element>
				<xsl:element name="tbody">
					<xsl:apply-templates select="WingButton" mode="index">
						<xsl:sort select="@buttonPosition" data-type="number"/>
					</xsl:apply-templates>
				</xsl:element>
			</xsl:element>
		</xsl:element>
	</xsl:template>

	<xsl:template name="Unreferenced">
		<xsl:element name="h2">
			<xsl:attribute name="class">headline</xsl:attribute>
			<xsl:attribute name="id">UnreferencedIndex</xsl:attribute>
			<xsl:text>Cuelists only available from Cuelist Directory (</xsl:text><xsl:value-of select="count(/CueLists/*[not(AnalogFader)][not(PlayBackButton)][not(PlayBackFader)][not(WingButton)])"/><xsl:text> total)</xsl:text>
		</xsl:element>
		<xsl:element name="dl">
			<xsl:element name="dd">
				<xsl:element name="table">
					<xsl:attribute name="class">table</xsl:attribute>
					<xsl:for-each select="/CueLists/*[not(AnalogFader)][not(PlayBackButton)][not(PlayBackFader)][not(WingButton)]">
						<xsl:sort select="@visualId" data-type="number"/>
						<xsl:variable name="cueClass">
							<xsl:choose>
								<xsl:when test="(position() mod 2) = 1">bodyOdd</xsl:when>
								<xsl:otherwise>bodyEven</xsl:otherwise>
							</xsl:choose>
						</xsl:variable>
						<xsl:element name="tr">
							<xsl:attribute name="class"><xsl:value-of select="$cueClass"/></xsl:attribute>
							<xsl:call-template name="CuelistNameHyperlink">
								<xsl:with-param name="Cuelist" select="."/>
							</xsl:call-template>
						</xsl:element>
					</xsl:for-each>
				</xsl:element>
			</xsl:element>
		</xsl:element>
	</xsl:template>

	<xsl:template name="CuelistName">
		<xsl:param name="Cuelist"/>
		<xsl:value-of select="$Cuelist/@visualId"/><xsl:text> - </xsl:text><xsl:value-of select="name($Cuelist)"/><xsl:text> </xsl:text><xsl:element name="b">&quot;<xsl:value-of select="$Cuelist/@cuelistName"/>&quot;</xsl:element>
	</xsl:template>
	
	<xsl:template name="CuelistNameHyperlink">
		<xsl:param name="Cuelist"/>
		<xsl:element name="a">
			<xsl:attribute name="href">#<xsl:value-of select="generate-id($Cuelist)"/></xsl:attribute>
			<xsl:call-template name="CuelistName">
				<xsl:with-param name="Cuelist" select="$Cuelist"/>
			</xsl:call-template>
		</xsl:element>
	</xsl:template>
</xsl:stylesheet>
